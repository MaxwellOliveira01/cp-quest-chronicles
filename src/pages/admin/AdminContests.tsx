import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Edit, Trash, Loader2 } from "lucide-react";
import { contestService } from "@/services/contestService";
import { ContestFullModel, ContestModel, ContestCreateModel, ContestUpdateModel } from "../../../api/contest";
import { LocalModel } from "../../../api/local";
import { localService } from "@/services/localService";

const AdminContests = () => {
  const navigate = useNavigate();
  const [contests, setContests] = useState<ContestModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContest, setEditingContest] = useState<ContestFullModel | null>(null);
  const [locals, setLocals] = useState<LocalModel[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    siteUrl: "",
    startDate: "",
    endDate: "",
    localId: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contestsData, localsData] = await Promise.all([
          contestService.list(),
          localService.getAll()
        ]);
        setContests(contestsData);
        setLocals(localsData);
      } catch (error) {
        console.error("Error fetching contests or locals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Helper to format date as ISO 8601 string (UTC midnight)
    const toIso8601 = (date: string) => {
      if (!date) return null;
      return `${date}T00:00:00Z`;
    };
    try {
      if (editingContest) {
        const updateData: ContestUpdateModel = {
          id: editingContest.id,
          name: formData.name,
          siteUrl: formData.siteUrl || undefined,
          startDate: formData.startDate ? toIso8601(formData.startDate) : undefined,
          endDate: formData.endDate ? toIso8601(formData.endDate) : undefined,
          localId: formData.localId || undefined
        };
        await contestService.update(updateData);
      } else {
        const createData: ContestCreateModel = {
          name: formData.name,
          siteUrl: formData.siteUrl || undefined,
          startDate: formData.startDate ? toIso8601(formData.startDate) : undefined,
          endDate: formData.endDate ? toIso8601(formData.endDate) : undefined,
          localId: formData.localId || undefined
        };
        await contestService.create(createData);
      }
      const contestsData = await contestService.list();
      setContests(contestsData);
      setIsFormOpen(false);
      setEditingContest(null);
      setFormData({ name: "", siteUrl: "", startDate: "", endDate: "", localId: "" });
    } catch (error) {
      console.error("Error saving contest:", error);
    }
  };

  const handleEdit = async (contestId: string) => {
    try {
      const contest = await contestService.get(contestId);
      setEditingContest(contest);
      const parseDate = (iso: string | null | undefined) => {
        if (!iso) return "";
        return iso.split("T")[0] || "";
      };
      setFormData({
        name: contest.name,
        siteUrl: contest.siteUrl || "",
        startDate: parseDate(contest.startDate),
        endDate: parseDate(contest.endDate),
        localId: contest.local?.id || ""
      });
      setIsFormOpen(true);
    } catch (error) {
      console.error("Error fetching contest details:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this contest?")) {
      setLoading(true);
      try {
        await contestService.delete(id);
        const contestsData = await contestService.list();
        setContests(contestsData);
      } catch (error) {
        console.error("Error deleting contest:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

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
                    Official Site URL
                  </label>
                  <input
                    type="text"
                    value={formData.siteUrl}
                    onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Local
                  </label>
                  <select
                    value={formData.localId}
                    onChange={e => setFormData({ ...formData, localId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">No Local</option>
                    {locals.map(local => (
                      <option key={local.id} value={local.id}>
                        {local.city} - {local.state}, {local.country}
                      </option>
                    ))}
                  </select>
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
                      setFormData({ name: "", siteUrl: "", startDate: "", endDate: "", localId: "" });
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
                      <a href={contest.siteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Official Site
                      </a>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(contest.id)}
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
