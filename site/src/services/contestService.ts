
import { BaseService } from './baseService';
import type { ContestModel } from '../../../api/contest';

class ContestService extends BaseService<ContestModel> {
  constructor() {
    super();
    this.initializeData();
  }

  private initializeData() {
    this.setItems([
      {
        id: 1,
        name: "ICPC World Finals 2023",
        year: 2023,
        contestId: "icpc-2023",
        officialPageUrl: "https://icpc.global/worldfinals",
        problemsPdfUrl: "https://icpc.global/worldfinals/problems.pdf",
        solutionsPdfUrl: "https://icpc.global/worldfinals/solutions.pdf"
      },
      {
        id: 2,
        name: "Google Code Jam 2022",
        year: 2022,
        contestId: "gcj-2022",
        officialPageUrl: "https://codingcompetitions.withgoogle.com/codejam",
        problemsPdfUrl: "https://codingcompetitions.withgoogle.com/codejam/problems.pdf",
        solutionsPdfUrl: "https://codingcompetitions.withgoogle.com/codejam/solutions.pdf"
      }
    ]);
  }
}

export const contestService = new ContestService();
