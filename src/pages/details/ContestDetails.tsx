
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react";
import { contestService } from "@/services/contestService";
import { ContestFullModel } from "../../../api/contest";
import { TeamModel } from "../../../api/team";
import { teamService } from "../../services/teamService";

const ContestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contest, setContest] = useState<ContestFullModel | null>(null);
  const [teams, setTeams] = useState<TeamModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContest = async () => {
      if (!id) return;
      
      setLoading(true);
      try {

        const [foundContest, foundTeams] = await Promise.all([
          contestService.get(id),
          teamService.list()
        ]);

        setTeams(foundTeams);
        setContest(foundContest);
      } catch (error) {
        console.error("Error fetching contest or teams:", error);
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

  const problemColors = [
    '#ef4444', // red
    '#f97316', // orange
    '#eab308', // yellow
    '#22c55e', // green
    '#06b6d4', // cyan
    '#3b82f6', // blue
    '#8b5cf6', // violet
    '#ec4899', // pink
    '#f59e0b', // amber
    '#10b981', // emerald
    '#6366f1', // indigo
    '#14b8a6', // teal
    '#a21caf', // purple
    '#f43f5e', // rose
    '#84cc16', // lime
    '#e11d48', // fuchsia
    '#0ea5e9', // sky
    '#b91c1c', // dark red
    '#facc15', // gold
    '#7c3aed', // deep violet
    '#d97706', // deep orange
    '#059669', // deep green
    '#2563eb', // deep blue
    '#db2777', // deep pink
    '#fde68a', // light yellow
    '#f87171', // light red
    '#a3e635', // light lime
    '#38bdf8', // light sky
    '#fbbf24', // light amber
    '#c026d3', // magenta
  ];

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
              {contest.siteUrl && (
                <Button
                  onClick={() => window.open(contest.siteUrl, '_blank')}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Official Page
                </Button>
              )}
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
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-center">Rank</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-center">Team Name</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-center">Penalty</th>
                    {contest.problems.map((problem, index) => (
                      <th key={problem.id} className="border border-gray-300 px-4 py-3 text-center font-semibold">
                        <div className="flex items-center justify-center gap-2">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: problemColors[index % problemColors.length] }}
                          ></div>
                          Problem {problem.label}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {contest.results.map((teamResult, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      
                      <td className="border border-gray-300 px-4 py-3 font-semibold text-center">
                        {teamResult.position}
                      </td>

                      <td className="border border-gray-300 px-4 py-3 font-medium text-center">
                        {teams.find(team => team.id === teamResult.teamId)?.name || "Unknown Team"}
                      </td>
                      
                      <td className="border border-gray-300 px-4 py-3 text-center">
                        {teamResult.penalty}
                      </td>
                      
                      {contest.problems.map((problem, problemIndex) => {
                        const submission = teamResult.submissions.find(s => s.problemId === problem.id);
                        return (
                          <td key={problemIndex} className="border border-gray-300 px-4 py-3 text-center">
                            {submission?.accepted ? (
                              <div className="flex flex-col items-center gap-1">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <ellipse
                                    cx="12"
                                    cy="9"
                                    rx="6"
                                    ry="8"
                                    fill={problemColors[problemIndex % problemColors.length]}
                                  />
                                  <ellipse cx="9" cy="6" rx="2" ry="3" fill="white" opacity="0.3" />
                                  <path d="M10 17 Q12 19 14 17 Q12 15 10 17 Z" fill="#B22222" />
                                  <path d="M12 17 C10 20, 14 21, 12 23" stroke="#666" strokeWidth="1" fill="none" />
                                </svg>
                                <div className="text-xs text-gray-600">
                                  <div>{submission.tries} tries</div>
                                  <div>{submission.penalty} min</div>
                                </div>
                              </div>
                            ) : (
                              <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto"></div>
                            )}
                          </td>
                        );
                      })}
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
