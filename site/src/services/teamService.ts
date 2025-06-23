
import { BaseService } from './baseService';
import type { TeamModel } from '../../../api/team';

class TeamService extends BaseService<TeamModel> {
  constructor() {
    super();
    this.initializeData();
  }

  private initializeData() {
    this.setItems([
      {
        id: 1,
        name: "MIT Thunder"
      },
      {
        id: 2,
        name: "Stanford Cardinals"
      },
      {
        id: 3,
        name: "CMU Tartans"
      }
    ]);
  }
}

export const teamService = new TeamService();
