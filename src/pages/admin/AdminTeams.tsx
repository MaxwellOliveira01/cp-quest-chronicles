
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Loader2 } from "lucide-react";
import { dataService } from "@/services/dataService";
import { TeamForm } from "@/components/admin/TeamForm";
import { TeamsList } from "@/components/admin/TeamsList";
import type { TeamFullModel } from "../../../api/models";

const AdminTeams = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState<TeamFullModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<TeamFullModel | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsData = await dataService.getTeams();
        setTeams(teamsData);
      } catch (error) {
        console.error("Error fetching teams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const refreshTeams = async () => {
    try {
      const teamsData = await dataService.getTeams();
      setTeams(teamsData);
      setIsFormOpen(false);
      setEditingTeam(null);
    } catch (error) {
      console.error("Error refreshing teams:", error);
    }
  };

  const handleEdit = (team: TeamFullModel) => {
    setEditingTeam(team);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this team?")) {
      try {
        await dataService.deleteTeam(id);
        const teamsData = await dataService.getTeams();
        setTeams(teamsData);
      } catch (error) {
        console.error("Error deleting team:", error);
      }
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTeam(null);
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
          <h1 className="text-3xl font-bold text-gray-900">Manage Teams</h1>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Team
          </Button>
        </div>

        <TeamForm
          isOpen={isFormOpen}
          editingTeam={editingTeam}
          onClose={handleCloseForm}
          onSave={refreshTeams}
        />

        <TeamsList
          teams={teams}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default AdminTeams;
