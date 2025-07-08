import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Edit, Trash, Loader2 } from "lucide-react";
import { universityService } from "@/services/universityService";
import { localService } from "@/services/localService";
import { UniversityModel, UniversityFullModel } from "../../../api/university";
import { LocalModel } from "../../../api/local";

const AdminUniversities = () => {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState<UniversityModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState<UniversityFullModel | null>(null);
  const [locals, setLocals] = useState<LocalModel[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    alias: "",
    localId: ""
  });

  useEffect(() => {
    const fetchUniversitiesAndLocals = async () => {
      setLoading(true);
      try {
        const [universitiesData, localsData] = await Promise.all([
          universityService.list(),
          localService.getAll()
        ]);
        setUniversities(universitiesData);
        setLocals(localsData);
      } catch (error) {
        console.error("Error fetching universities or locals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUniversitiesAndLocals();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingUniversity) {
        await universityService.update({
          id: editingUniversity.id,
          name: formData.name,
          alias: formData.alias,
          localId: formData.localId || undefined
        });
      } else {
        await universityService.create({
          name: formData.name,
          alias: formData.alias,
          localId: formData.localId || undefined
        });
      }
      const universitiesData = await universityService.list();
      setUniversities(universitiesData);
      setIsFormOpen(false);
      setEditingUniversity(null);
      setFormData({ name: "", alias: "", localId: "" });
    } catch (error) {
      console.error("Error saving university:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (university: UniversityModel) => {
    setLoading(true);
    try {
      const fullUniversity = await universityService.get(university.id);
      setEditingUniversity(fullUniversity);
      setFormData({
        name: fullUniversity.name,
        alias: fullUniversity.alias,
        localId: fullUniversity.local?.id ?? ""
      });
      setIsFormOpen(true);
    } catch (error) {
      console.error("Error fetching university details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this university?")) {
      setLoading(true);
      try {
        await universityService.delete(id);
        const universitiesData = await universityService.list();
        setUniversities(universitiesData);
      } catch (error) {
        console.error("Error deleting university:", error);
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
          <h1 className="text-3xl font-bold text-gray-900">Manage Universities</h1>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add University
          </Button>
        </div>

        {isFormOpen && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingUniversity ? 'Edit University' : 'Add New University'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    University Name
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
                    Alias
                  </label>
                  <input
                    type="text"
                    value={formData.alias}
                    onChange={(e) => setFormData({ ...formData,alias: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
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
                    {editingUniversity ? 'Update' : 'Create'} University
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsFormOpen(false);
                      setEditingUniversity(null);
                      setFormData({ name: "", alias: "", localId: "" });
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
            <CardTitle>Universities List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {universities.map((university) => (
                <div key={university.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold">{university.name} - {university.alias}</h3>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(university)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(university.id)}
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

export default AdminUniversities;
