
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Loader2 } from "lucide-react";
import { teamService } from "@/services/teamService";
import { TeamForm } from "@/components/admin/TeamForm";
import { TeamsList } from "@/components/admin/TeamsList";
import type { TeamFullModel } from "../../../api/models";
import { useToast } from "@/hooks/use-toast";

const AdminTeams = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [teams, setTeams] = useState<TeamFullModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<TeamFullModel | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsData = await teamService.getAll();
        setTeams(teamsData);
      } catch (error) {
        console.error("Error fetching teams:", error);
        toast({
          title: "Error",
          description: "Failed to fetch teams",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [toast]);

  const refreshTeams = async () => {
    setActionLoading(true);
    try {
      const teamsData = await teamService.getAll();
      setTeams(teamsData);
      setIsFormOpen(false);
      setEditingTeam(null);
      toast({
        title: "Success",
        description: editingTeam ? "Team updated successfully" : "Team created successfully"
      });
    } catch (error) {
      console.error("Error refreshing teams:", error);
      toast({
        title: "Error",
        description: "Failed to save team",
        variant: "destructive"
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleEdit = (team: TeamFullModel) => {
    setEditingTeam(team);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this team?")) {
      setActionLoading(true);
      try {
        await teamService.delete(id);
        const teamsData = await teamService.getAll();
        setTeams(teamsData);
        toast({
          title: "Success",
          description: "Team deleted successfully"
        });
      } catch (error) {
        console.error("Error deleting team:", error);
        toast({
          title: "Error",
          description: "Failed to delete team",
          variant: "destructive"
        });
      } finally {
        setActionLoading(false);
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
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {actionLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg flex items-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
            <span>Processing...</span>
          </div>
        </div>
      )}
      
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
          <Button onClick={() => setIsFormOpen(true)} className="bg-teal-600 hover:bg-teal-700">
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
