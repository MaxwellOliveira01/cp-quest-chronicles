import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { teamService } from "@/services/teamService";
import { contestService } from "@/services/contestService";
import { teamResultService } from "@/services/teamResultsService";
import { TeamSearchModel } from "../../../api/team";
import { ContestModel, ContestFullModel } from "../../../api/contest";
import { SubmissionModel } from "../../../api/submission";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


import { TeamResultUpdateModel } from '../../../api/teamResult';

const AdminTeamResult = () => {
  const [teams, setTeams] = useState<TeamSearchModel[]>([]);
  const [contests, setContests] = useState<ContestModel[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string>("");
  const [selectedContestId, setSelectedContestId] = useState<string>("");
  const [contest, setContest] = useState<ContestFullModel | null>(null);
  const [submissions, setSubmissions] = useState<SubmissionModel[]>([]);
  const [penalty, setPenalty] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    teamService.listForSearch("").then(setTeams);
    contestService.list().then(setContests);
  }, []);

  useEffect(() => {
    const fetchContestAndResult = async () => {
      setLoading(true);
      try {
        if (selectedContestId && selectedTeamId) {
          const contestFull = await contestService.get(selectedContestId);
          setContest(contestFull);
          // Check if result exists for this team and contest
          const existsResult = await teamResultService.exists(selectedTeamId, selectedContestId);
          if (existsResult.exists) {
            // Fetch the result
            const result = await teamResultService.getByTeamAndContest(selectedTeamId, selectedContestId);
            setPenalty(result.penalty || 0);
            setPosition(result.position || 0);
            setSubmissions(result.submissions || []);
          } else {
            setPenalty(0);
            setPosition(0);
            setSubmissions(contestFull.problems.map((problem) => ({
              id: "",
              teamResultId: "",
              problemId: problem.id,
              tries: 0,
              accepted: false,
              penalty: 0
            })));
          }
        } else if (selectedContestId) {
          // Only contest selected, fetch contest
          const contestFull = await contestService.get(selectedContestId);
          setContest(contestFull);
          setPenalty(0);
          setPosition(0);
          setSubmissions(contestFull.problems.map((problem) => ({
            id: "",
            teamResultId: "",
            problemId: problem.id,
            tries: 0,
            accepted: false,
            penalty: 0
          })));
        } else {
          setContest(null);
          setPenalty(0);
          setPosition(0);
          setSubmissions([]);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchContestAndResult();
  }, [selectedContestId, selectedTeamId]);

  // When contest changes, reset penalty, position, and submissions if not loaded by fetchContestAndResult

  const handleSubmissionChange = <K extends keyof SubmissionModel>(problemId: string, field: K, value: SubmissionModel[K]) => {
    setSubmissions((prev) => {
      // If submission exists, update it; otherwise, add a new one
      const idx = prev.findIndex(s => s.problemId === problemId);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], [field]: value };
        return updated;
      } else {
        // Add a new submission for this problemId
        return [
          ...prev,
          {
            id: "",
            teamResultId: "",
            problemId,
            tries: field === "tries" ? (value as number) : 0,
            accepted: field === "accepted" ? (value as boolean) : false,
            penalty: field === "penalty" ? (value as number) : 0
          }
        ];
      }
    });
  };

  const handleSubmit = async () => {
    if (!selectedTeamId || !selectedContestId || !contest) return;
    setLoading(true);
    try {
      // Build a map of current submissions by problemId
      const submissionMap = new Map(submissions.map(s => [s.problemId, s]));
      // Ensure every problem in the contest has a submission, and preserve correct mapping by problemId
      const allSubmissions = contest.problems
        .sort((a, b) => a.order - b.order)
        .map(problem => {
          const s = submissionMap.get(problem.id);
          return {
            problemId: problem.id,
            tries: s ? s.tries : 0,
            accepted: s ? s.accepted : false,
            penalty: s ? s.penalty : 0
          };
        });
      const model: TeamResultUpdateModel = {
        teamId: selectedTeamId,
        contestId: selectedContestId,
        penalty,
        position,
        submissions: allSubmissions
      };
      await teamResultService.update(model);
    } catch (e) {
      // Optionally handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={() => navigate("/admin")}>{"<"} Back to Admin Dashboard</Button>
          <h1 className="text-2xl font-bold">Manage Team Results</h1>
          <div />
        </div>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Team Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label htmlFor="team-select" className="block text-sm font-medium text-gray-700 mb-1">Team</label>
                <select
                  id="team-select"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={selectedTeamId}
                  onChange={e => setSelectedTeamId(e.target.value)}
                  disabled={loading}
                >
                  <option value="">Select a team</option>
                  {teams.map(team => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="contest-select" className="block text-sm font-medium text-gray-700 mb-1">Contest</label>
                <select
                  id="contest-select"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={selectedContestId}
                  onChange={e => setSelectedContestId(e.target.value)}
                  disabled={loading}
                >
                  <option value="">Select a contest</option>
                  {contests.map(contest => (
                    <option key={contest.id} value={contest.id}>{contest.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {loading && <div className="text-center py-4">Loading...</div>}

            {contest && !loading && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-4">Problems</h2>
                <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
                  <div className="mb-4 flex gap-4">
                    <div className="flex-1">
                      <label htmlFor="overall-penalty" className="block text-xs font-medium text-gray-700 mb-1">Overall Penalty</label>
                      <input
                        id="overall-penalty"
                        type="number"
                        min={0}
                        className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={penalty}
                        onChange={e => setPenalty(Number(e.target.value))}
                        disabled={loading}
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="final-position" className="block text-xs font-medium text-gray-700 mb-1">Final Position</label>
                      <input
                        id="final-position"
                        type="number"
                        min={0}
                        className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={position}
                        onChange={e => setPosition(Number(e.target.value))}
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    {contest.problems
                      .sort((a, b) => a.order - b.order)
                      .map((problem) => {
                        const s = submissions.find(sub => sub.problemId === problem.id);
                        return (
                          <div key={problem.id} className="flex items-center gap-4 border border-gray-200 bg-gray-50 p-3 rounded">
                            <div className="flex-1">
                              <span className="font-medium text-gray-800">{problem.name}</span>
                            </div>
                            <div>
                              <label htmlFor={`tries-input-${problem.id}`} className="text-xs mr-1">Tries</label>
                              <input
                                id={`tries-input-${problem.id}`}
                                type="number"
                                min={0}
                                className="w-16 border border-gray-300 rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                value={s?.tries ?? 0}
                                onChange={e => handleSubmissionChange(problem.id, "tries", Number(e.target.value))}
                                disabled={loading}
                              />
                            </div>
                            <div>
                              <label htmlFor={`penalty-input-${problem.id}`} className="text-xs mr-1">Penalty</label>
                              <input
                                id={`penalty-input-${problem.id}`}
                                type="number"
                                min={0}
                                className="w-16 border border-gray-300 rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                value={s?.penalty ?? 0}
                                onChange={e => handleSubmissionChange(problem.id, "penalty", Number(e.target.value))}
                                disabled={loading}
                              />
                            </div>
                            <div className="flex items-center">
                              <label htmlFor={`accepted-checkbox-${problem.id}`} className="text-xs mr-1">Accepted</label>
                              <input
                                id={`accepted-checkbox-${problem.id}`}
                                type="checkbox"
                                checked={s?.accepted ?? false}
                                onChange={e => handleSubmissionChange(problem.id, "accepted", e.target.checked)}
                                disabled={loading}
                              />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <div className="mt-6 flex gap-4">
                    <Button type="submit" className="bg-teal-600 hover:bg-teal-700" disabled={loading}>Submit</Button>
                  </div>
                </form>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminTeamResult;
