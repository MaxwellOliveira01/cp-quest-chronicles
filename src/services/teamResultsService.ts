import { ResultsExistsModel, TeamResultFullModel, TeamResultUpdateModel } from '../../api/teamResult';

const apiRoute: string = 'http://localhost:5169/api/team-results';

class TeamResultService {

    async exists(teamId: string, contestId: string): Promise<ResultsExistsModel> {
        const response = await fetch(`${apiRoute}/exists?teamId=${teamId}&contestId=${contestId}`);
        if (!response.ok) throw new Error('Failed to check results existence');
        const data: ResultsExistsModel = await response.json();
        return data;
    }

    async getByTeamAndContest(teamId: string, contestId: string): Promise<TeamResultFullModel> {
        const response = await fetch(`${apiRoute}/by-team-and-contest?teamId=${teamId}&contestId=${contestId}`);
        if (!response.ok) throw new Error('Failed to fetch team results');
        const data: TeamResultFullModel = await response.json();
        return data;
    }

    async update(model: TeamResultUpdateModel): Promise<void> {
        const response = await fetch(`${apiRoute}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(model)
        });
        if (!response.ok) throw new Error('Failed to update team result');
    }
}

export const teamResultService = new TeamResultService();