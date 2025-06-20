
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Edit, Trash } from "lucide-react";
import { dataService, Contest } from "@/services/dataService";

const AdminContests = () => {
  const navigate = useNavigate();
  const [contests, setContests] = useState(dataService.getContests());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContest, setEditingContest] = useState<Contest | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    officialUrl: "",
    problemsUrl: "",
    solutionsUrl: "",
    problemCount: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingContest) {
      dataService.updateContest(editingContest.id, {
        ...editingContest,
        ...formData,
        problemsUrl: formData.problemsUrl || null,
        solutionsUrl: formData.solutionsUrl || null
      });
    } else {
      dataService.addContest({
        ...formData,
        problemsUrl: formData.problemsUrl || null,
        solutionsUrl: formData.solutionsUrl || null,
        teams: []
      });
    }
    
    setContests(dataService.getContests());
    setIsFormOpen(false);
    setEditingContest(null);
    setFormData({ name: "", officialUrl: "", problemsUrl: "", solutionsUrl: "", problemCount: 1 });
  };

  const handleEdit = (contest: Contest) => {
    setEditingContest(contest);
    setFormData({
      name: contest.name,
      officialUrl: contest.officialUrl,
      problemsUrl: contest.problemsUrl || "",
      solutionsUrl: contest.solutionsUrl || "",
      problemCount: contest.problemCount
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this contest?")) {
      dataService.deleteContest(id);
      setContests(dataService.getContests());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/admin")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Admin Dashboard
        </Button>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Contests</h1>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Contest
          </Button>
        </div>

        {isFormOpen && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingContest ? 'Edit Contest' : 'Add New Contest'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contest Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Official URL
                  </label>
                  <input
                    type="url"
                    value={formData.officialUrl}
                    onChange={(e) => setFormData({ ...formData, officialUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Problems
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="26"
                    value={formData.problemCount}
                    onChange={(e) => setFormData({ ...formData, problemCount: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Problems URL (optional)
                  </label>
                  <input
                    type="url"
                    value={formData.problemsUrl}
                    onChange={(e) => setFormData({ ...formData, problemsUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Solutions URL (optional)
                  </label>
                  <input
                    type="url"
                    value={formData.solutionsUrl}
                    onChange={(e) => setFormData({ ...formData, solutionsUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-4">
                  <Button type="submit">
                    {editingContest ? 'Update' : 'Create'} Contest
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsFormOpen(false);
                      setEditingContest(null);
                      setFormData({ name: "", officialUrl: "", problemsUrl: "", solutionsUrl: "", problemCount: 1 });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Contests List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contests.map((contest) => (
                <div key={contest.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold">{contest.name}</h3>
                    <p className="text-sm text-gray-600">
                      <a href={contest.officialUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Official Site
                      </a>
                    </p>
                    <p className="text-sm text-gray-600">{contest.problemCount} problems</p>
                    <p className="text-sm text-gray-600">{contest.teams.length} teams participated</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(contest)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(contest.id)}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminContests;
