
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Download, Loader2 } from "lucide-react";
import { dataService, Contest } from "@/services/dataService";

const ContestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contest, setContest] = useState<Contest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContest = async () => {
      if (!id) return;
      
      try {
        const foundContest = await dataService.findContest(id);
        setContest(foundContest || null);
      } catch (error) {
        console.error("Error fetching contest:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContest();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

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
  
  // Generate consistent colors for each problem
  const problemColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#6366f1'];

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
            <div className="flex gap-4 mt-4">
              <Button 
                onClick={() => window.open(contest.officialUrl, '_blank')}
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Official Page
              </Button>
              <Button 
                variant={contest.problemsUrl ? "default" : "secondary"}
                disabled={!contest.problemsUrl}
                onClick={() => contest.problemsUrl && window.open(contest.problemsUrl, '_blank')}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Problems PDF
              </Button>
              <Button 
                variant={contest.solutionsUrl ? "default" : "secondary"}
                disabled={!contest.solutionsUrl}
                onClick={() => contest.solutionsUrl && window.open(contest.solutionsUrl, '_blank')}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Solutions PDF
              </Button>
            </div>
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
                    {problemKeys.map((problem, index) => (
                      <th key={problem} className="border border-gray-300 px-4 py-3 text-center font-semibold">
                        <div className="flex items-center justify-center gap-2">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: problemColors[index % problemColors.length] }}
                          ></div>
                          Problem {problem}
                        </div>
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
                      {problemKeys.map((problem, problemIndex) => (
                        <td key={problem} className="border border-gray-300 px-4 py-3 text-center">
                          {team.problems[problem]?.solved ? (
                            <div className="flex flex-col items-center gap-1">
                              <div 
                                className="text-2xl"
                                style={{ color: problemColors[problemIndex % problemColors.length] }}
                              >
                                🎈
                              </div>
                              <div className="text-xs text-gray-600">
                                <div>{team.problems[problem].submissions} tries</div>
                                <div>{team.problems[problem].timeMinutes}min</div>
                              </div>
                            </div>
                          ) : (
                            <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto"></div>
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
