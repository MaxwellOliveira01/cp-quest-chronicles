import { BaseService } from './baseService';

export interface Contest {
  id: string;
  name: string;
  officialUrl: string;
  problemsUrl: string | null;
  solutionsUrl: string | null;
  problemCount: number;
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

class ContestService extends BaseService<Contest> {
  constructor() {
    super();
    this.initializeData();
  }

  private initializeData() {
    this.setItems([
      {
        id: "1",
        name: "ICPC World Finals 2023",
        officialUrl: "https://icpc.global/worldfinals/2023",
        problemsUrl: "https://icpc.global/worldfinals/2023/problems.pdf",
        solutionsUrl: null,
        problemCount: 11,
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
        problemCount: 6,
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
    ]);
  }
}

export const contestService = new ContestService();
