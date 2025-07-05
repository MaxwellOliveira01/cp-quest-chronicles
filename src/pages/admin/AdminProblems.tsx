import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { problemService } from "@/services/problemService";
import { contestService } from "@/services/contestService";
import { ProblemModel, ProblemCreateModel, ProblemUpdateModel } from "../../../api/problem";
import { ContestModel } from "../../../api/contest";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const initialForm = { name: "", label: "", order: 1, contestId: "" };

const AdminProblems = () => {
  const [problems, setProblems] = useState<ProblemModel[]>([]);
  const [contests, setContests] = useState<ContestModel[]>([]);
  const [form, setForm] = useState<ProblemCreateModel>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [problemsData, contestsData] = await Promise.all([
          problemService.list(),
          contestService.list()
        ]);
        setProblems(problemsData);
        setContests(contestsData);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const refreshProblems = async () => {
    setProblems(await problemService.list());
    setEditingId(null);
    setForm(initialForm);
  };

  const handleEdit = async (id: string) => {
    const problem = await problemService.get(id);
    setEditingId(id);
    setForm({
      name: problem.name,
      label: problem.label,
      order: problem.order,
      contestId: problem.contest?.id || ""
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this problem?")) {
      await problemService.delete(id);
      refreshProblems();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.label || !form.contestId) return;
    if (editingId) {
      const updateData: ProblemUpdateModel = { ...form, id: editingId };
      await problemService.update(updateData);
    } else {
      await problemService.create(form);
    }
    refreshProblems();
    setShowForm(false);
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(initialForm);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" onClick={() => navigate("/admin")}>Back to Admin Dashboard</Button>
          <h1 className="text-3xl font-bold text-gray-900">Manage Problems</h1>
          <Button onClick={() => { setShowForm(true); setEditingId(null); setForm(initialForm); }} className="bg-teal-600 hover:bg-teal-700">Add Problem</Button>
        </div>
        {showForm && (
          <div className="mb-8 max-w-xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>{editingId ? "Edit Problem" : "Add New Problem"}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="problem-name">Name</label>
                    <input
                      id="problem-name"
                      type="text"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="problem-label">Label</label>
                    <input
                      id="problem-label"
                      type="text"
                      value={form.label}
                      onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="problem-order">Order</label>
                    <input
                      id="problem-order"
                      type="number"
                      min={1}
                      value={form.order}
                      onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="problem-contest">Contest</label>
                    <select
                      id="problem-contest"
                      value={form.contestId}
                      onChange={e => setForm(f => ({ ...f, contestId: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    >
                      <option value="">Select Contest</option>
                      {contests.map(contest => (
                        <option key={contest.id} value={contest.id}>{contest.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-4">
                    <Button type="submit" className="bg-teal-600 hover:bg-teal-700">{editingId ? "Update" : "Create"} Problem</Button>
                    <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
        <Card>
          <CardHeader>
            <CardTitle>Problems List</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Label</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Contest</th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {problems.map(problem => (
                      <tr key={problem.id}>
                        <td className="px-4 py-2 whitespace-nowrap">{problem.name}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{problem.label}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{problem.order}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{contests.find(c => c.id === problem.contestId)?.name || "-"}</td>
                        <td className="px-4 py-2 whitespace-nowrap flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(problem.id)}>Edit</Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(problem.id)}>Delete</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminProblems;
