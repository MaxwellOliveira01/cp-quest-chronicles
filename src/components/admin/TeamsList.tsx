
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash } from "lucide-react";
import { Team } from "@/services/dataService";

interface TeamsListProps {
  teams: Team[];
  onEdit: (team: Team) => void;
  onDelete: (id: string) => void;
}

export const TeamsList = ({ teams, onEdit, onDelete }: TeamsListProps) => {
  return (
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
                  onClick={() => onEdit(team)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(team.id)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
