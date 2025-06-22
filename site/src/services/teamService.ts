
import { BaseService } from './baseService';

export interface Team {
  id: string;
  name: string;
  university: string;
  members: Array<{
    name: string;
    profileId: string;
  }>;
  contests: Array<{
    name: string;
    year: number;
    contestId: string;
    position?: number;
    problems?: Record<string, {
      solved: boolean;
      submissions?: number;
      timeMinutes?: number;
    }>;
  }>;
}

class TeamService extends BaseService<Team> {
  constructor() {
    super();
    this.initializeData();
  }

  private initializeData() {
    this.setItems([
      {
        id: "1",
        name: "MIT Coders",
        university: "MIT",
        members: [
          { name: "Alice Johnson", profileId: "1" },
          { name: "David Wilson", profileId: "4" },
          { name: "Emma Brown", profileId: "5" }
        ],
        contests: [
          { 
            name: "ICPC World Finals 2020", 
            year: 2020, 
            contestId: "1",
            position: 15,
            problems: {
              A: { solved: true, submissions: 1, timeMinutes: 15 },
              B: { solved: true, submissions: 2, timeMinutes: 45 },
              C: { solved: false },
              D: { solved: true, submissions: 3, timeMinutes: 120 }
            }
          },
          { 
            name: "ICPC Regional 2023", 
            year: 2023, 
            contestId: "4",
            position: 3
          }
        ]
      },
      {
        id: "2",
        name: "Algorithm Masters",
        university: "MIT",
        members: [
          { name: "Alice Johnson", profileId: "1" },
          { name: "Michael Chang", profileId: "10" },
          { name: "Sarah Kim", profileId: "11" }
        ],
        contests: [
          { 
            name: "Google Code Jam 2021", 
            year: 2021, 
            contestId: "2",
            position: 8
          }
        ]
      },
      {
        id: "3",
        name: "Code Warriors",
        university: "MIT",
        members: [
          { name: "Alice Johnson", profileId: "1" },
          { name: "Tom Anderson", profileId: "12" },
          { name: "Lisa Wang", profileId: "13" }
        ],
        contests: [
          { 
            name: "Facebook Hacker Cup 2022", 
            year: 2022, 
            contestId: "3",
            position: 12
          }
        ]
      },
      {
        id: "4",
        name: "Stanford Stars",
        university: "Stanford",
        members: [
          { name: "Bob Smith", profileId: "2" },
          { name: "Frank Miller", profileId: "6" },
          { name: "Grace Lee", profileId: "7" }
        ],
        contests: [
          { 
            name: "ICPC Regional 2019", 
            year: 2019, 
            contestId: "4",
            position: 5
          }
        ]
      },
      {
        id: "5",
        name: "Binary Beasts",
        university: "Stanford",
        members: [
          { name: "Bob Smith", profileId: "2" },
          { name: "Jake Wilson", profileId: "14" },
          { name: "Amy Chen", profileId: "15" }
        ],
        contests: [
          { 
            name: "Google Code Jam 2020", 
            year: 2020, 
            contestId: "2",
            position: 20
          }
        ]
      },
      {
        id: "6",
        name: "CMU Champions",
        university: "CMU",
        members: [
          { name: "Charlie Davis", profileId: "3" },
          { name: "Helen Chen", profileId: "8" },
          { name: "Ivan Rodriguez", profileId: "9" }
        ],
        contests: [
          { 
            name: "ICPC World Finals 2021", 
            year: 2021, 
            contestId: "1",
            position: 25
          }
        ]
      }
    ]);
  }
}

export const teamService = new TeamService();
