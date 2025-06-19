
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { mockProfiles } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProfileDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const profile = mockProfiles.find(p => p.id === id);

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile not found</h1>
          <Button onClick={() => navigate("/")}>Go back home</Button>
        </div>
      </div>
    );
  }

  const chartData = profile.contests.map(contest => ({
    year: contest.year,
    position: contest.position,
    contest: contest.contest
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/search/profile")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Search
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-3xl">{profile.name}</CardTitle>
                <p className="text-xl text-gray-600">@{profile.handle}</p>
                <p className="text-gray-500">{profile.university}</p>
              </CardHeader>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Contest Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis 
                        reversed 
                        label={{ value: 'Position', angle: -90, position: 'insideLeft' }}
                      />
                      <Tooltip 
                        formatter={(value, name, props) => [
                          `Position: ${value}`, 
                          props.payload.contest
                        ]}
                      />
                      <Bar dataKey="position" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Contest History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.contests.map((contest, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <Link to={`/contest/${contest.contestId}`}>
                        <h4 className="font-semibold text-blue-600 hover:text-blue-800 cursor-pointer">
                          {contest.contest}
                        </h4>
                      </Link>
                      <p className="text-sm text-gray-600">{contest.year}</p>
                      <p className="text-sm font-medium text-blue-600">
                        Position: {contest.position}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Teams</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {profile.teams.map((team, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <Link to={`/team/${team.teamId}`}>
                        <h4 className="font-semibold text-blue-600 hover:text-blue-800 cursor-pointer">
                          {team.name}
                        </h4>
                      </Link>
                      <p className="text-sm text-gray-600">{team.year}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
