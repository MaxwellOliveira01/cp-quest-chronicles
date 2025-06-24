
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { dataService, Team, Profile, University, Contest } from "@/services/dataService";

interface ContestParticipation {
  contestId: string;
  name: string;
  year: number;
  problems?: Record<string, {
    solved: boolean;
    submissions?: number;
    timeMinutes?: number;
  }>;
}

interface TeamFormProps {
  isOpen: boolean;
  editingTeam: Team | null;
  onClose: () => void;
  onSave: () => void;
}

export const TeamForm = ({ isOpen, editingTeam, onClose, onSave }: TeamFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    university: "",
    members: [] as string[],
    contests: [] as ContestParticipation[]
  });
  const [selectedContestForProblems, setSelectedContestForProblems] = useState<string | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(false);

  // Load data when form opens
  useEffect(() => {
    if (isOpen) {
      loadFormData();
    }
  }, [isOpen]);

  const loadFormData = async () => {
    setLoading(true);
    try {
      const [profilesData, universitiesData, contestsData] = await Promise.all([
        dataService.getProfiles(),
        dataService.getUniversities(),
        dataService.getContests()
      ]);
      setProfiles(profilesData);
      setUniversities(universitiesData);
      setContests(contestsData);
    } catch (error) {
      console.error("Error loading form data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset form data when editingTeam changes
  useEffect(() => {
    if (editingTeam) {
      setFormData({
        name: editingTeam.name,
        university: editingTeam.university,
        members: editingTeam.members.map(m => m.profileId),
        contests: editingTeam.contests
      });
    } else {
      setFormData({
        name: "",
        university: "",
        members: [],
        contests: []
      });
    }
    setSelectedContestForProblems(null);
  }, [editingTeam, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedMembers = formData.members.map(memberId => {
      const profile = profiles.find(p => p.id === memberId);
      return { name: profile?.name || "", profileId: memberId };
    });
    
    try {
      if (editingTeam) {
        await dataService.updateTeam(editingTeam.id, {
          ...editingTeam,
          name: formData.name,
          university: formData.university,
          members: selectedMembers,
          contests: formData.contests
        });
      } else {
        await dataService.addTeam({
          name: formData.name,
          university: formData.university,
          members: selectedMembers,
          contests: formData.contests
        });
      }
      
      onSave();
    } catch (error) {
      console.error("Error saving team:", error);
    }
  };

  const handleMemberToggle = (profileId: string) => {
    const isCurrentlySelected = formData.members.includes(profileId);
    
    if (isCurrentlySelected) {
      const members = formData.members.filter(id => id !== profileId);
      setFormData({ ...formData, members });
    } else {
      if (formData.members.length < 3) {
        const members = [...formData.members, profileId];
        setFormData({ ...formData, members });
      }
    }
  };

  const handleContestToggle = (contestId: string) => {
    const contest = contests.find(c => c.id === contestId);
    if (!contest) return;

    const isSelected = formData.contests.some(c => c.contestId === contestId);
    
    if (isSelected) {
      const updatedContests = formData.contests.filter(c => c.contestId !== contestId);
      setFormData({ ...formData, contests: updatedContests });
    } else {
      const newContest: ContestParticipation = {
        contestId: contest.id,
        name: contest.name,
        year: new Date().getFullYear(),
        problems: {}
      };
      setFormData({ ...formData, contests: [...formData.contests, newContest] });
    }
  };

  const handleProblemChange = (contestId: string, problemKey: string, field: string, value: any) => {
    const updatedContests = formData.contests.map(contest => {
      if (contest.contestId === contestId) {
        const updatedProblems = { ...contest.problems };
        if (!updatedProblems[problemKey]) {
          updatedProblems[problemKey] = { solved: false };
        }
        updatedProblems[problemKey] = { ...updatedProblems[problemKey], [field]: value };
        return { ...contest, problems: updatedProblems };
      }
      return contest;
    });
    setFormData({ ...formData, contests: updatedContests });
  };

  const generateProblemKeys = (count: number) => {
    return Array.from({ length: count }, (_, i) => String.fromCharCode(65 + i));
  };

  if (!isOpen) return null;

  if (loading) {
    return (
      <Card className="mb-8">
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{editingTeam ? 'Edit Team' : 'Add New Team'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Team Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              University
            </label>
            <select
              value={formData.university}
              onChange={(e) => setFormData({ ...formData, university: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select University</option>
              {universities.map((university) => (
                <option key={university.id} value={university.name}>
                  {university.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Team Members (max 3)
            </label>
            <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
              {profiles.map((profile) => {
                const isSelected = formData.members.includes(profile.id);
                const canSelect = isSelected || formData.members.length < 3;
                
                return (
                  <label key={profile.id} className="flex items-center space-x-2 p-1">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleMemberToggle(profile.id)}
                      disabled={!canSelect}
                      className="rounded"
                    />
                    <span className={`text-sm ${!canSelect ? 'text-gray-400' : ''}`}>
                      {profile.name} ({profile.handle}) - {profile.university}
                    </span>
                  </label>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 mt-1">Selected: {formData.members.length}/3</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contests Participated
            </label>
            <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
              {contests.map((contest) => (
                <div key={contest.id} className="p-2 border-b border-gray-100">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.contests.some(c => c.contestId === contest.id)}
                      onChange={() => handleContestToggle(contest.id)}
                      className="rounded"
                    />
                    <span className="text-sm font-medium">{contest.name}</span>
                  </label>
                  {formData.contests.some(c => c.contestId === contest.id) && (
                    <div className="mt-2 ml-6">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedContestForProblems(
                          selectedContestForProblems === contest.id ? null : contest.id
                        )}
                      >
                        {selectedContestForProblems === contest.id ? 'Hide' : 'Show'} Problems
                      </Button>
                      {selectedContestForProblems === contest.id && (
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          {generateProblemKeys(contest.problemCount).map(problemKey => {
                            const contestParticipation = formData.contests.find(c => c.contestId === contest.id);
                            const problem = contestParticipation?.problems?.[problemKey] || { solved: false };
                            
                            return (
                              <div key={problemKey} className="border border-gray-200 p-2 rounded">
                                <div className="font-medium text-sm">Problem {problemKey}</div>
                                <label className="flex items-center space-x-1 mt-1">
                                  <input
                                    type="checkbox"
                                    checked={problem.solved}
                                    onChange={(e) => handleProblemChange(contest.id, problemKey, 'solved', e.target.checked)}
                                    className="rounded"
                                  />
                                  <span className="text-xs">Solved</span>
                                </label>
                                {problem.solved && (
                                  <>
                                    <input
                                      type="number"
                                      placeholder="Submissions"
                                      value={problem.submissions || ''}
                                      onChange={(e) => handleProblemChange(contest.id, problemKey, 'submissions', parseInt(e.target.value) || 0)}
                                      className="w-full mt-1 px-2 py-1 text-xs border border-gray-300 rounded"
                                    />
                                    <input
                                      type="number"
                                      placeholder="Time (minutes)"
                                      value={problem.timeMinutes || ''}
                                      onChange={(e) => handleProblemChange(contest.id, problemKey, 'timeMinutes', parseInt(e.target.value) || 0)}
                                      className="w-full mt-1 px-2 py-1 text-xs border border-gray-300 rounded"
                                    />
                                  </>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">Selected: {formData.contests.length} contests</p>
          </div>
          <div className="flex gap-4">
            <Button type="submit" disabled={formData.members.length === 0}>
              {editingTeam ? 'Update' : 'Create'} Team
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
