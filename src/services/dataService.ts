
import { mockProfiles, mockUniversities, mockTeams, mockContests } from '@/data/mockData';

export interface Event {
  id: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  participants: string[]; // Profile IDs
}

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

export interface University {
  id: string;
  name: string;
  students: Array<{
    name: string;
    profileId: string;
  }>;
  contests: string[];
}

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
  }>;
}

export interface Contest {
  id: string;
  name: string;
  officialUrl: string;
  problemsUrl: string | null;
  solutionsUrl: string | null;
  teams: Array<{
    name: string;
    penalty: number;
    problems: Record<string, {
      solved: boolean;
      submissions?: number;
      timeMinutes?: number;
    }>;
  }>;
}

class DataService {
  private profiles: Profile[] = [
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
  ];

  private universities: University[] = [
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
  ];

  private teams: Team[] = [
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
        { name: "ICPC World Finals 2020", year: 2020, contestId: "1" },
        { name: "ICPC Regional 2023", year: 2023, contestId: "4" }
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
        { name: "Google Code Jam 2021", year: 2021, contestId: "2" }
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
        { name: "Facebook Hacker Cup 2022", year: 2022, contestId: "3" }
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
        { name: "ICPC Regional 2019", year: 2019, contestId: "4" }
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
        { name: "Google Code Jam 2020", year: 2020, contestId: "2" }
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
        { name: "ICPC World Finals 2021", year: 2021, contestId: "1" }
      ]
    }
  ];

  private contests: Contest[] = [
    {
      id: "1",
      name: "ICPC World Finals 2023",
      officialUrl: "https://icpc.global/worldfinals/2023",
      problemsUrl: "https://icpc.global/worldfinals/2023/problems.pdf",
      solutionsUrl: null,
      teams: [
        { 
          name: "MIT Coders", 
          penalty: 1247, 
          problems: {
            A: { solved: true, submissions: 1, timeMinutes: 15 },
            B: { solved: true, submissions: 2, timeMinutes: 45 },
            C: { solved: false },
            D: { solved: true, submissions: 3, timeMinutes: 120 },
            E: { solved: false },
            F: { solved: true, submissions: 1, timeMinutes: 180 },
            G: { solved: true, submissions: 4, timeMinutes: 210 },
            H: { solved: false },
            I: { solved: true, submissions: 2, timeMinutes: 240 },
            J: { solved: false },
            K: { solved: true, submissions: 1, timeMinutes: 270 }
          }
        },
        { 
          name: "Stanford Stars", 
          penalty: 1350, 
          problems: {
            A: { solved: true, submissions: 2, timeMinutes: 25 },
            B: { solved: true, submissions: 1, timeMinutes: 60 },
            C: { solved: true, submissions: 3, timeMinutes: 90 },
            D: { solved: false },
            E: { solved: true, submissions: 2, timeMinutes: 140 },
            F: { solved: false },
            G: { solved: true, submissions: 1, timeMinutes: 190 },
            H: { solved: true, submissions: 5, timeMinutes: 220 },
            I: { solved: false },
            J: { solved: true, submissions: 2, timeMinutes: 250 },
            K: { solved: false }
          }
        }
      ]
    },
    {
      id: "2",
      name: "Google Code Jam 2023",
      officialUrl: "https://codingcompetitions.withgoogle.com/codejam",
      problemsUrl: "https://codejam.googleapis.com/2023/problems.pdf",
      solutionsUrl: "https://codejam.googleapis.com/2023/solutions.pdf",
      teams: [
        { 
          name: "Algorithm Masters", 
          penalty: 892, 
          problems: {
            A: { solved: true, submissions: 1, timeMinutes: 10 },
            B: { solved: true, submissions: 2, timeMinutes: 30 },
            C: { solved: true, submissions: 1, timeMinutes: 75 },
            D: { solved: true, submissions: 3, timeMinutes: 120 },
            E: { solved: false },
            F: { solved: true, submissions: 2, timeMinutes: 180 }
          }
        }
      ]
    }
  ];

  private events: Event[] = [
    {
      id: "1",
      name: "ICPC World Finals 2023",
      location: "Dhaka, Bangladesh",
      startDate: "2023-11-15",
      endDate: "2023-11-20",
      participants: ["1", "2"]
    },
    {
      id: "2",
      name: "Programming Bootcamp 2022",
      location: "San Francisco, CA",
      startDate: "2022-07-10",
      endDate: "2022-07-17",
      participants: ["1", "3"]
    }
  ];

  // Getter methods
  getProfiles(): Profile[] {
    return this.profiles;
  }

  getUniversities(): University[] {
    return this.universities;
  }

  getTeams(): Team[] {
    return this.teams;
  }

  getContests(): Contest[] {
    return this.contests;
  }

  getEvents(): Event[] {
    return this.events;
  }

  // Find methods
  findProfile(id: string): Profile | undefined {
    return this.profiles.find(p => p.id === id);
  }

  findUniversity(id: string): University | undefined {
    return this.universities.find(u => u.id === id);
  }

  findTeam(id: string): Team | undefined {
    return this.teams.find(t => t.id === id);
  }

  findContest(id: string): Contest | undefined {
    return this.contests.find(c => c.id === id);
  }

  findEvent(id: string): Event | undefined {
    return this.events.find(e => e.id === id);
  }

  // CRUD operations
  addProfile(profile: Omit<Profile, 'id'>): Profile {
    const newProfile = { ...profile, id: Date.now().toString() };
    this.profiles.push(newProfile);
    return newProfile;
  }

  updateProfile(id: string, updates: Partial<Profile>): Profile | null {
    const index = this.profiles.findIndex(p => p.id === id);
    if (index === -1) return null;
    this.profiles[index] = { ...this.profiles[index], ...updates };
    return this.profiles[index];
  }

  deleteProfile(id: string): boolean {
    const index = this.profiles.findIndex(p => p.id === id);
    if (index === -1) return false;
    this.profiles.splice(index, 1);
    return true;
  }

  addUniversity(university: Omit<University, 'id'>): University {
    const newUniversity = { ...university, id: Date.now().toString() };
    this.universities.push(newUniversity);
    return newUniversity;
  }

  updateUniversity(id: string, updates: Partial<University>): University | null {
    const index = this.universities.findIndex(u => u.id === id);
    if (index === -1) return null;
    this.universities[index] = { ...this.universities[index], ...updates };
    return this.universities[index];
  }

  deleteUniversity(id: string): boolean {
    const index = this.universities.findIndex(u => u.id === id);
    if (index === -1) return false;
    this.universities.splice(index, 1);
    return true;
  }

  addTeam(team: Omit<Team, 'id'>): Team {
    const newTeam = { ...team, id: Date.now().toString() };
    this.teams.push(newTeam);
    return newTeam;
  }

  updateTeam(id: string, updates: Partial<Team>): Team | null {
    const index = this.teams.findIndex(t => t.id === id);
    if (index === -1) return null;
    this.teams[index] = { ...this.teams[index], ...updates };
    return this.teams[index];
  }

  deleteTeam(id: string): boolean {
    const index = this.teams.findIndex(t => t.id === id);
    if (index === -1) return false;
    this.teams.splice(index, 1);
    return true;
  }

  addContest(contest: Omit<Contest, 'id'>): Contest {
    const newContest = { ...contest, id: Date.now().toString() };
    this.contests.push(newContest);
    return newContest;
  }

  updateContest(id: string, updates: Partial<Contest>): Contest | null {
    const index = this.contests.findIndex(c => c.id === id);
    if (index === -1) return null;
    this.contests[index] = { ...this.contests[index], ...updates };
    return this.contests[index];
  }

  deleteContest(id: string): boolean {
    const index = this.contests.findIndex(c => c.id === id);
    if (index === -1) return false;
    this.contests.splice(index, 1);
    return true;
  }

  addEvent(event: Omit<Event, 'id'>): Event {
    const newEvent = { ...event, id: Date.now().toString() };
    this.events.push(newEvent);
    return newEvent;
  }

  updateEvent(id: string, updates: Partial<Event>): Event | null {
    const index = this.events.findIndex(e => e.id === id);
    if (index === -1) return null;
    this.events[index] = { ...this.events[index], ...updates };
    return this.events[index];
  }

  deleteEvent(id: string): boolean {
    const index = this.events.findIndex(e => e.id === id);
    if (index === -1) return false;
    this.events.splice(index, 1);
    return true;
  }
}

export const dataService = new DataService();
