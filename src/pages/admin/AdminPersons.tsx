
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Edit, Trash, Loader2 } from "lucide-react";
import { personService } from "@/services/personService";
import { universityService } from "@/services/universityService";
import { PersonFullModel, PersonSearchModel, PersonCreateModel, PersonUpdateModel } from "../../../api/person";
import { UniversityModel } from "../../../api/university";

const AdminPersons = () => {
  const navigate = useNavigate();
  const [persons, setPersons] = useState<PersonSearchModel[]>([]);
  const [universities, setUniversities] = useState<UniversityModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<PersonFullModel | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    handle: "",
    universityId: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [personsData, universitiesData] = await Promise.all([
          personService.listForSearch(""),
          universityService.list()
        ]);
        setPersons(personsData);
        setUniversities(universitiesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPerson) {
        const updateData: PersonUpdateModel = {
          id: editingPerson.id,
          name: formData.name,
          handle: formData.handle,
          universityId: formData.universityId || null
        };
        await personService.update(updateData);
      } else {
        const createData: PersonCreateModel = {
          name: formData.name,
          handle: formData.handle,
          universityId: formData.universityId || null
        };
        await personService.create(createData);
      }
      const personsData = await personService.listForSearch("");
      setPersons(personsData);
      setIsFormOpen(false);
      setEditingPerson(null);
      setFormData({ name: "", handle: "", universityId: "" });
    } catch (error) {
      console.error("Error saving person:", error);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      const person = await personService.get(id);
      setEditingPerson(person);
      setFormData({
        name: person.name,
        handle: person.handle,
        universityId: person.university?.id || ""
      });
      setIsFormOpen(true);
    } catch (error) {
      console.error("Error fetching person details:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this person?")) {
      try {
        await personService.delete(id);
        const personsData = await personService.list();
        setPersons(personsData);
      } catch (error) {
        console.error("Error deleting person:", error);
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
          <h1 className="text-3xl font-bold text-gray-900">Manage Persons</h1>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Person
          </Button>
        </div>

        {isFormOpen && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingPerson ? 'Edit Person' : 'Add New Person'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
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
                    Handle
                  </label>
                  <input
                    type="text"
                    value={formData.handle}
                    onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    University
                  </label>
                  <select
                    value={formData.universityId}
                    onChange={(e) => setFormData({ ...formData, universityId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select University</option>
                    {universities.map((university) => (
                      <option key={university.id} value={university.id}>
                        {university.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-4">
                  <Button type="submit">
                    {editingPerson ? 'Update' : 'Create'} Person
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsFormOpen(false);
                      setEditingPerson(null);
                      setFormData({ name: "", handle: "", universityId: "" });
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
            <CardTitle>Persons List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {persons.map((person) => (
                <div key={person.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold">{person.name}</h3>
                    <p className="text-sm text-gray-600">@{person.handle}</p>
                    <p className="text-sm text-gray-600">{person?.university?.name || 'No university'}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(person.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(person.id)}
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

export default AdminPersons;
