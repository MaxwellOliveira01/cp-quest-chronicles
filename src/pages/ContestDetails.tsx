
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { mockContests } from "@/data/mockData";

const ContestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const contest = mockContests.find(c => c.id === id);

  if (!contest) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Contest not found</h1>
          <Button onClick={() => navigate("/")}>Go back home</Button>
        </div>
      </div>
    );
  }

  const problemKeys = Object.keys(contest.teams[0]?.problems || {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/search/contest")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Search
        </Button>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl">{contest.name}</CardTitle>
            <p className="text-gray-600">Contest Results</p>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Rank</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Team Name</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Penalty</th>
                    {problemKeys.map(problem => (
                      <th key={problem} className="border border-gray-300 px-4 py-3 text-center font-semibold">
                        Problem {problem}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {contest.teams.map((team, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 font-medium">
                        {team.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        {team.penalty}
                      </td>
                      {problemKeys.map(problem => (
                        <td key={problem} className="border border-gray-300 px-4 py-3 text-center">
                          {team.problems[problem] ? (
                            <div className="w-6 h-6 bg-green-500 rounded-full mx-auto flex items-center justify-center">
                              <span className="text-white text-xs font-bold">✓</span>
                            </div>
                          ) : (
                            <div className="w-6 h-6 bg-gray-300 rounded-full mx-auto"></div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContestDetails;
