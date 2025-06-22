import { BaseService } from './baseService';

export interface Profile {
  id: string;
  name: string;
  handle: string;
  university: string;
  contests: Array<{
    year: number;
    contest: string;
    position: number;
    contestId: string;
  }>;
  teams: Array<{
    name: string;
    year: number;
    teamId: string;
  }>;
  events: Array<{
    name: string;
    eventId: string;
  }>;
}

class ProfileService extends BaseService<Profile> {
  constructor() {
    super();
    this.initializeData();
  }

  private initializeData() {
    this.setItems([
      {
        id: "1",
        name: "Alice Johnson",
        handle: "alice_codes",
        university: "MIT",
        contests: [
          { year: 2020, contest: "ICPC World Finals", position: 15, contestId: "1" },
          { year: 2020, contest: "ICPC Regional", position: 3, contestId: "4" },
          { year: 2021, contest: "Google Code Jam", position: 8, contestId: "2" },
          { year: 2021, contest: "TopCoder Open", position: 12, contestId: "5" },
          { year: 2022, contest: "Facebook Hacker Cup", position: 12, contestId: "3" },
          { year: 2022, contest: "Codeforces Round", position: 5, contestId: "6" },
          { year: 2023, contest: "ICPC Regional", position: 3, contestId: "4" },
        ],
        teams: [
          { name: "MIT Coders", year: 2020, teamId: "1" },
          { name: "Algorithm Masters", year: 2021, teamId: "2" },
          { name: "Code Warriors", year: 2022, teamId: "3" },
        ],
        events: [
          { name: "ICPC World Finals 2023", eventId: "1" },
          { name: "Programming Bootcamp 2022", eventId: "2" },
        ]
      },
      {
        id: "2",
        name: "Bob Smith",
        handle: "bob_algo",
        university: "Stanford",
        contests: [
          { year: 2019, contest: "ICPC Regional", position: 5, contestId: "4" },
          { year: 2020, contest: "Google Code Jam", position: 20, contestId: "2" },
          { year: 2020, contest: "Facebook Hacker Cup", position: 15, contestId: "3" },
          { year: 2021, contest: "TopCoder Open", position: 7, contestId: "5" },
        ],
        teams: [
          { name: "Stanford Stars", year: 2019, teamId: "4" },
          { name: "Binary Beasts", year: 2020, teamId: "5" },
        ],
        events: [
          { name: "ICPC World Finals 2023", eventId: "1" },
        ]
      },
      {
        id: "3",
        name: "Charlie Davis",
        handle: "charlie_cp",
        university: "CMU",
        contests: [
          { year: 2021, contest: "ICPC World Finals", position: 25, contestId: "1" },
          { year: 2022, contest: "Codeforces Round", position: 18, contestId: "6" },
        ],
        teams: [
          { name: "CMU Champions", year: 2021, teamId: "6" },
        ],
        events: [
          { name: "Programming Bootcamp 2022", eventId: "2" },
        ]
      }
    ]);
  }
}

export const profileService = new ProfileService();
