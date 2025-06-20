
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { dataService, Team } from "@/services/dataService";
import { TeamForm } from "@/components/admin/TeamForm";
import { TeamsList } from "@/components/admin/TeamsList";

const AdminTeams = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState(dataService.getTeams());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);

  // Refresh teams list whenever the form closes or team is saved
  const refreshTeams = () => {
    setTeams(dataService.getTeams());
    setIsFormOpen(false);
    setEditingTeam(null);
  };

  const handleEdit = (team: Team) => {
    setEditingTeam(team);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this team?")) {
      dataService.deleteTeam(id);
      setTeams(dataService.getTeams());
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTeam(null);
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
