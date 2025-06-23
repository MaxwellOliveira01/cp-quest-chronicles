
import { BaseService } from './baseService';
import type { UniversityModel } from '../../../api/university';

class UniversityService extends BaseService<UniversityModel> {
  constructor() {
    super();
    this.initializeData();
  }

  private initializeData() {
    this.setItems([
      {
        id: 1,
        name: "MIT"
      },
      {
        id: 2,
        name: "Stanford University"
      },
      {
        id: 3,
        name: "Carnegie Mellon University"
      }
    ]);
  }
}

export const universityService = new UniversityService();
