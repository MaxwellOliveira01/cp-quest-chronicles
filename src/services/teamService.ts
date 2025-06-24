
import { TeamFullModel, TeamSearchModel } from '../../api/models';

class TeamService {

  async get(id: string): Promise<TeamFullModel> {
    const response = await fetch(`/api/team/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch team');
    }
    return response.json();
  }

  async list(prefix: string): Promise<TeamSearchModel[]> {
    const response = await fetch(`/api/team?prefix=${encodeURIComponent(prefix)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch teams');
    }
    return response.json();
  }
  
}

export const teamService = new TeamService();
