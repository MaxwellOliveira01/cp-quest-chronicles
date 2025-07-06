
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { teamService } from "@/services/teamService";
import { TeamFullModel } from "../../../api/team";
import { ContestModel } from "../../../api/contest";
import { contestService } from "../../services/contestService";

const TeamDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState<TeamFullModel | null>(null);
  const [contests, setContests] = useState<ContestModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      if (!id) return;
      
      setLoading(true);
      try {

        const [foundTeam, foundContests] = await Promise.all([
          teamService.get(id),
          contestService.list()
        ]);

        setTeam(foundTeam);
        setContests(foundContests);
      } catch (error) {
        console.error("Error fetching team or contests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [id]);

  const getMedalIcon = (position: number) => {
    if (position >= 1 && position <= 4) {
      return "🥇"; // Gold
    } else if (position >= 5 && position <= 8) {
      return "🥈"; // Silver
    } else if (position >= 9 && position <= 12) {
      return "🥉"; // Bronze
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!team) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Team not found</h1>
          <Button onClick={() => navigate("/")}>Go back home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/search/team")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Search
        </Button>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl">{team.name}</CardTitle>
            {team.university && (
              <p className="text-xl text-gray-600">{team.university.name}</p>
            )}
            <p className="text-gray-500">Team Profile</p>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              {team.members.length > 0 ? (
                <div className="space-y-3">
                  {team.members.map((member, index) => (
                    <div key={team.members[index].id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <Link to={`/person/${member.id}`}>
                        <h4 className="font-semibold text-blue-600 hover:text-blue-800">{member.name}</h4>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-600">No team members assigned.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contest Participation</CardTitle>
            </CardHeader>
            <CardContent>
              {team.results.length > 0 ? (
                <div className="space-y-3">
                  {team.results.map((result, index) => {
                    const contest = contests.find(c => c.id === result.contestId);
                    return (
                      <div key={team.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <Link to={`/contest/${result.contestId}`}>
                          <h4 className="font-semibold text-blue-600 hover:text-blue-800">
                            {contest ? contest.name : "Unknown Contest"}
                          </h4>
                        </Link>
                        <p className="text-sm font-medium text-blue-600">
                          Position: {result.position} {getMedalIcon(result.position)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-600">No contest participation yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;
