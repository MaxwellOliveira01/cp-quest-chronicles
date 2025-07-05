import { useState, useEffect } from "react";
import { teamService } from "@/services/teamService";
import { TeamFullModel, TeamCreateModel, TeamUpdateModel } from "../../../api/team";
import { PersonSearchModel } from "../../../api/person";
import { UniversityModel } from "../../../api/university";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";

interface TeamFormProps {
  isOpen: boolean;
  editingTeam: TeamFullModel | null;
  onClose: () => void;
  onSave: () => void;
  persons: PersonSearchModel[];
  universities: UniversityModel[];
}

export const TeamForm = ({ isOpen, editingTeam, onClose, onSave, persons, universities }: TeamFormProps) => {
  const [formData, setFormData] = useState<{
    name: string;
    universityId: string;
    members: string[];
  }>({
    name: "",
    universityId: "",
    members: []
  });

  useEffect(() => {
    if (editingTeam) {
      setFormData({
        name: editingTeam.name,
        universityId: editingTeam.university?.id || "",
        members: editingTeam.members.map(m => m.id)
      });
    } else {
      setFormData({
        name: "",
        universityId: "",
        members: []
      });
    }
  }, [editingTeam, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTeam) {
        const updateData: TeamUpdateModel = {
          id: editingTeam.id,
          name: formData.name,
          universityId: formData.universityId || null,
          memberIds: formData.members
        };
        await teamService.update(updateData);
      } else {
        const createData: TeamCreateModel = {
          name: formData.name,
          universityId: formData.universityId || null,
          memberIds: formData.members
        };
        await teamService.create(createData);
      }
      onSave();
    } catch (error) {
      console.error("Error saving team:", error);
    }
  };

  const handleMemberToggle = (personId: string) => {
    const isCurrentlySelected = formData.members.includes(personId);
    if (isCurrentlySelected) {
      setFormData((prev) => ({ ...prev, members: prev.members.filter((id) => id !== personId) }));
    } else if (formData.members.length < 3) {
      setFormData((prev) => ({ ...prev, members: [...prev.members, personId] }));
    }
  };

  if (!isOpen) return null;

  const getUniversityName = (person: PersonSearchModel) => {
    if (person.university) return person.university.name;
    return "No university";
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{editingTeam ? 'Edit Team' : 'Add New Team'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="team-name">
              Team Name
            </label>
            <input
              id="team-name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="university-select">
              University
            </label>
            <select
              id="university-select"
              value={formData.universityId}
              onChange={(e) => setFormData({ ...formData, universityId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Select University</option>
              {universities.map((university) => (
                <option key={university.id} value={university.id}>
                  {university.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-2" id="team-members-label">
              Team Members (max 3)
            </span>
            <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2" aria-labelledby="team-members-label">
              {persons.map((person) => {
                const isSelected = formData.members.includes(person.id);
                const canSelect = isSelected || formData.members.length < 3;
                return (
                  <label key={person.id} className="flex items-center space-x-2 p-1">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleMemberToggle(person.id)}
                      disabled={!canSelect && !isSelected}
                      className="rounded"
                    />
                    <span className={`text-sm ${!canSelect && !isSelected ? 'text-gray-400' : ''}`}>
                      {person.name} ({person.handle}) - {getUniversityName(person)}
                    </span>
                  </label>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 mt-1">Selected: {formData.members.length}/3</p>
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