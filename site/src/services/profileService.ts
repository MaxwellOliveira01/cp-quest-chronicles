
import { BaseService } from './baseService';
import type { ProfileModel } from '../../../api/profile';
import type { UniversityModel } from '../../../api/university';

class ProfileService extends BaseService<ProfileModel> {
  constructor() {
    super();
    this.initializeData();
  }

  private initializeData() {
    const universityMIT: UniversityModel = {
      id: 1,
      name: "MIT"
    };

    const universityStanford: UniversityModel = {
      id: 2,
      name: "Stanford University"
    };

    const universityCMU: UniversityModel = {
      id: 3,
      name: "Carnegie Mellon University"
    };

    this.setItems([
      {
        id: 1,
        name: "Alice Johnson",
        handle: "alice_codes",
        university: universityMIT
      },
      {
        id: 2,
        name: "Bob Smith",
        handle: "bob_algo",
        university: universityStanford
      },
      {
        id: 3,
        name: "Charlie Davis",
        handle: "charlie_dev",
        university: universityCMU
      },
      {
        id: 4,
        name: "David Wilson",
        handle: "david_w",
        university: universityMIT
      },
      {
        id: 5,
        name: "Emma Brown",
        handle: "emma_b",
        university: universityMIT
      }
    ]);
  }
}

export const profileService = new ProfileService();
