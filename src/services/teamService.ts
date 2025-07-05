import { TeamCreateModel, TeamFullModel, TeamModel, TeamSearchModel, TeamUpdateModel } from "api/team";

const apiRoute: string = 'http://localhost:5169/api/teams';

class TeamService {

  async get(id: string): Promise<TeamFullModel> {
    let response = await fetch(`${apiRoute}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch team');
    let data: TeamFullModel = await response.json();
    return data;
  }

  async list(prefix: string, universityFilter?: string): Promise<TeamModel[]> {
    let response = await fetch(`${apiRoute}/list?prefix=${encodeURIComponent(prefix)}&university=${encodeURIComponent(universityFilter || '')}`);
    if (!response.ok) throw new Error('Failed to fetch teams');
    let data: TeamModel[] = await response.json();
    return data;
  }

  async listForSearch(prefix: string, universityFilter?: string): Promise<TeamSearchModel[]> {
    let response = await fetch(`${apiRoute}/list/search-model?prefix=${encodeURIComponent(prefix)}&university=${encodeURIComponent(universityFilter || '')}`);
    if (!response.ok) throw new Error('Failed to fetch teams');
    let data: TeamSearchModel[] = await response.json();
    return data;
  }

  async create(data: TeamCreateModel): Promise<void> {
    let response = await fetch(apiRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create team');
  }

  async update(data: TeamUpdateModel): Promise<void> {    
    let response = await fetch(apiRoute, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update team');
  }

  async delete(id: string): Promise<void> {
    let response = await fetch(`${apiRoute}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete team');
  }

}

export const teamService = new TeamService();
