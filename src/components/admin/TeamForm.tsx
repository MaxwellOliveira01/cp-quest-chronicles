
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { profileService } from "@/services/profileService";
import { universityService } from "@/services/universityService";
import { contestService } from "@/services/contestService";
import { teamService } from "@/services/teamService";
import type { TeamFullModel, ProfileFullModel, UniversityFullModel, ContestFullModel } from "../../../api/models";

interface TeamFormProps {
  isOpen: boolean;
  editingTeam: TeamFullModel | null;
  onClose: () => void;
  onSave: () => void;
}

export const TeamForm = ({ isOpen, editingTeam, onClose, onSave }: TeamFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    university: "",
    members: [] as string[],
    contests: [] as { contestId: string; position: number }[]
  });
  const [profiles, setProfiles] = useState<ProfileFullModel[]>([]);
  const [universities, setUniversities] = useState<UniversityFullModel[]>([]);
  const [contests, setContests] = useState<ContestFullModel[]>([]);
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
        profileService.getAll(),
        universityService.getAll(),
        contestService.getAll()
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
        contests: editingTeam.contests.map(c => ({
          contestId: c.contest.id,
          position: c.position
        }))
      });
    } else {
      setFormData({
        name: "",
        university: "",
        members: [],
        contests: []
      });
    }
  }, [editingTeam, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedMembers = formData.members.map(memberId => {
      const profile = profiles.find(p => p.id === memberId);
      return { 
        id: memberId, 
        name: profile?.name || "", 
        profileId: memberId 
      };
    });
    
    const contestPerformances = formData.contests.map(c => {
      const contest = contests.find(contest => contest.id === c.contestId);
      return {
        position: c.position,
        contest: {
          id: c.contestId,
          name: contest?.name || '',
          year: contest?.year || new Date().getFullYear()
        }
      };
    });
    
    try {
      if (editingTeam) {
        await teamService.update(editingTeam.id, {
          ...editingTeam,
          name: formData.name,
          university: formData.university,
          members: selectedMembers,
          contests: contestPerformances
        });
      } else {
        await teamService.create({
          name: formData.name,
          university: formData.university,
          members: selectedMembers,
          contests: contestPerformances
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
    const isSelected = formData.contests.some(c => c.contestId === contestId);
    
    if (isSelected) {
      const updatedContests = formData.contests.filter(c => c.contestId !== contestId);
      setFormData({ ...formData, contests: updatedContests });
    } else {
      const newContest = {
        contestId,
        position: 1
      };
      setFormData({ ...formData, contests: [...formData.contests, newContest] });
    }
  };

  const handlePositionChange = (contestId: string, position: number) => {
    const updatedContests = formData.contests.map(contest => {
      if (contest.contestId === contestId) {
        return { ...contest, position };
      }
      return contest;
    });
    setFormData({ ...formData, contests: updatedContests });
  };

  if (!isOpen) return null;

  if (loading) {
    return (
      <Card className="mb-8">
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                      {profile.name} ({profile.handle}) - {profile.university || 'No university'}
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
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Position
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.contests.find(c => c.contestId === contest.id)?.position || 1}
                        onChange={(e) => handlePositionChange(contest.id, parseInt(e.target.value) || 1)}
                        className="w-20 px-2 py-1 text-xs border border-gray-300 rounded"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">Selected: {formData.contests.length} contests</p>
          </div>
          
          <div className="flex gap-4">
            <Button type="submit" disabled={formData.members.length === 0} className="bg-teal-600 hover:bg-teal-700">
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
