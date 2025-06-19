
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { dataService } from "@/services/dataService";

const TeamDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const team = dataService.findTeam(id || "");

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
              <div className="space-y-3">
                {team.members.map((member, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Link to={`/profile/${member.profileId}`}>
                      <h4 className="font-semibold text-blue-600 hover:text-blue-800">{member.name}</h4>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contest Participation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {team.contests.map((contest, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Link to={`/contest/${contest.contestId}`}>
                      <h4 className="font-semibold text-blue-600 hover:text-blue-800">
                        {contest.name}
                      </h4>
                      <p className="text-sm text-gray-600">{contest.year}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;
