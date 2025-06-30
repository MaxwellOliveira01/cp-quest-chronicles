
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import ContestPerformance from "@/components/ContestPerformance";
import { TeamFullModel } from "../../../api/models";
import { teamService } from "@/services/teamService";

const TeamDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState<TeamFullModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const foundTeam = await teamService.get(id);
        setTeam(foundTeam);
      } catch (error) {
        console.error("Error fetching team:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [id]);

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
            <p className="text-xl text-gray-600">{team.university}</p>
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
                    <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <Link to={`/person/${member.personId}`}>
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
              {team.contests.length > 0 ? (
                <div className="space-y-3">
                  {team.contests.map((performance, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <Link to={`/contest/${performance.contest.id}`}>
                        <h4 className="font-semibold text-blue-600 hover:text-blue-800">
                          {performance.contest.name}
                        </h4>
                        <p className="text-sm text-gray-600">{performance.contest.year}</p>
                        <p className="text-sm font-medium text-blue-600">
                          Position: {performance.position}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-600">No contest participation yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {team.contests.length > 0 && (
          <div className="mt-8">
            <ContestPerformance 
              contests={team.contests} 
              title="Team Contest Performance" 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamDetails;
