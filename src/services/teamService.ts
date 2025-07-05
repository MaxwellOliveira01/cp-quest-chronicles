import { TeamCreateModel, TeamFullModel, TeamModel, TeamSearchModel, TeamUpdateModel } from "api/team";

const apiRoute: string = 'http://localhost:5169/api/teams';

class TeamService {

  async get(id: string): Promise<TeamFullModel> {
    const response = await fetch(`${apiRoute}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch team');
    const data: TeamFullModel = await response.json();
    return data;
  }

  // async list(prefix: string, universityIdFilter?: string): Promise<TeamModel[]> {
  //   const response = await fetch(`${apiRoute}/list?prefix=${encodeURIComponent(prefix)}&universityId=${universityIdFilter || ''}`);
  //   if (!response.ok) throw new Error('Failed to fetch teams');
  //   const data: TeamModel[] = await response.json();
  //   return data;
  // }

  async listForSearch(prefix: string, universityIdFilter?: string): Promise<TeamSearchModel[]> {
    console.log(`Fetching teams with prefix: ${prefix} and universityIdFilter: ${universityIdFilter}`);
    const response = await fetch(`${apiRoute}/list/search-model?prefix=${encodeURIComponent(prefix)}&universityId=${universityIdFilter || ''}`);
    if (!response.ok) throw new Error('Failed to fetch teams');
    const data: TeamSearchModel[] = await response.json();
    return data;
  }

  async create(data: TeamCreateModel): Promise<void> {
    const response = await fetch(apiRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create team');
  }

  async update(data: TeamUpdateModel): Promise<void> {    
    const response = await fetch(apiRoute, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update team');
  }

  async delete(id: string): Promise<void> {
    const response = await fetch(`${apiRoute}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete team');
  }

}

export const teamService = new TeamService();
