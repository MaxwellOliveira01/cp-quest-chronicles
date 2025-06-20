
import { BaseService } from './baseService';

export interface University {
  id: string;
  name: string;
  students: Array<{
    name: string;
    profileId: string;
  }>;
  contests: string[];
}

class UniversityService extends BaseService<University> {
  constructor() {
    super();
    this.initializeData();
  }

  private initializeData() {
    this.setItems([
      {
        id: "1",
        name: "MIT",
        students: [
          { name: "Alice Johnson", profileId: "1" },
          { name: "David Wilson", profileId: "4" },
          { name: "Emma Brown", profileId: "5" }
        ],
        contests: ["ICPC World Finals 2020", "Google Code Jam 2021", "ICPC Regional 2023"]
      },
      {
        id: "2",
        name: "Stanford University",
        students: [
          { name: "Bob Smith", profileId: "2" },
          { name: "Frank Miller", profileId: "6" },
          { name: "Grace Lee", profileId: "7" }
        ],
        contests: ["ICPC Regional 2019", "Google Code Jam 2020", "TopCoder Open 2021"]
      },
      {
        id: "3",
        name: "Carnegie Mellon University",
        students: [
          { name: "Charlie Davis", profileId: "3" },
          { name: "Helen Chen", profileId: "8" },
          { name: "Ivan Rodriguez", profileId: "9" }
        ],
        contests: ["ICPC World Finals 2021", "Codeforces Round 2022"]
      }
    ]);
  }
}

export const universityService = new UniversityService();
