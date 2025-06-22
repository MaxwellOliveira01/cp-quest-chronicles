
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Edit, Trash, Loader2 } from "lucide-react";
import { dataService, University } from "@/services/dataService";

const AdminUniversities = () => {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState<University | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    contests: [] as string[]
  });

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const universitiesData = await dataService.getUniversities();
        setUniversities(universitiesData);
      } catch (error) {
        console.error("Error fetching universities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingUniversity) {
        await dataService.updateUniversity(editingUniversity.id, {
          ...editingUniversity,
          ...formData
        });
      } else {
        await dataService.addUniversity({
          ...formData,
          students: []
        });
      }
      
      const universitiesData = await dataService.getUniversities();
      setUniversities(universitiesData);
      setIsFormOpen(false);
      setEditingUniversity(null);
      setFormData({ name: "", contests: [] });
    } catch (error) {
      console.error("Error saving university:", error);
    }
  };

  const handleEdit = (university: University) => {
    setEditingUniversity(university);
    setFormData({
      name: university.name,
      contests: university.contests
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this university?")) {
      try {
        await dataService.deleteUniversity(id);
        const universitiesData = await dataService.getUniversities();
        setUniversities(universitiesData);
      } catch (error) {
        console.error("Error deleting university:", error);
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
                      setFormData({ name: "", contests: [] });
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
                    <h3 className="font-semibold">{university.name}</h3>
                    <p className="text-sm text-gray-600">{university.students.length} students</p>
                    <p className="text-sm text-gray-600">{university.contests.length} contests</p>
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
