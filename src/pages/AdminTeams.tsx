
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Edit, Trash } from "lucide-react";
import { dataService, Team } from "@/services/dataService";

const AdminTeams = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState(dataService.getTeams());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    university: "",
    members: [] as string[]
  });

  const profiles = dataService.getProfiles();
  const universities = dataService.getUniversities();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedMembers = formData.members.map(memberId => {
      const profile = profiles.find(p => p.id === memberId);
      return { name: profile?.name || "", profileId: memberId };
    });
    
    if (editingTeam) {
      dataService.updateTeam(editingTeam.id, {
        ...editingTeam,
        name: formData.name,
        university: formData.university,
        members: selectedMembers
      });
    } else {
      dataService.addTeam({
        name: formData.name,
        university: formData.university,
        members: selectedMembers,
        contests: []
      });
    }
    
    setTeams(dataService.getTeams());
    setIsFormOpen(false);
    setEditingTeam(null);
    setFormData({ name: "", university: "", members: [] });
  };

  const handleEdit = (team: Team) => {
    setEditingTeam(team);
    setFormData({
      name: team.name,
      university: team.university,
      members: team.members.map(m => m.profileId)
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this team?")) {
      dataService.deleteTeam(id);
      setTeams(dataService.getTeams());
    }
  };

  const handleMemberToggle = (profileId: string) => {
    const members = formData.members.includes(profileId)
      ? formData.members.filter(id => id !== profileId)
      : [...formData.members, profileId];
    setFormData({ ...formData, members });
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
          <h1 className="text-3xl font-bold text-gray-900">Manage Teams</h1>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Team
          </Button>
        </div>

        {isFormOpen && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingTeam ? 'Edit Team' : 'Add New Team'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Team Name
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
                    University
                  </label>
                  <select
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select University</option>
                    {universities.map((university) => (
                      <option key={university.id} value={university.name}>
                        {university.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Team Members (max 3)
                  </label>
                  <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
                    {profiles.map((profile) => (
                      <label key={profile.id} className="flex items-center space-x-2 p-1">
                        <input
                          type="checkbox"
                          checked={formData.members.includes(profile.id)}
                          onChange={() => handleMemberToggle(profile.id)}
                          disabled={!formData.members.includes(profile.id) && formData.members.length >= 3}
                          className="rounded"
                        />
                        <span className={`text-sm ${!formData.members.includes(profile.id) && formData.members.length >= 3 ? 'text-gray-400' : ''}`}>
                          {profile.name} ({profile.handle}) - {profile.university}
                        </span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Selected: {formData.members.length}/3</p>
                </div>
                <div className="flex gap-4">
                  <Button type="submit" disabled={formData.members.length === 0}>
                    {editingTeam ? 'Update' : 'Create'} Team
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsFormOpen(false);
                      setEditingTeam(null);
                      setFormData({ name: "", university: "", members: [] });
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
            <CardTitle>Teams List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teams.map((team) => (
                <div key={team.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold">{team.name}</h3>
                    <p className="text-sm text-gray-600">{team.university}</p>
                    <p className="text-sm text-gray-600">
                      Members: {team.members.map(m => m.name).join(", ")}
                    </p>
                    <p className="text-sm text-gray-600">{team.contests.length} contests</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(team)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(team.id)}
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

export default AdminTeams;
