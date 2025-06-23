import { ProblemResultModel } from "./problem";

export interface ContestModel {
    id: number;
    name: string;
    year: number;
    contestId: string;
    officialPageUrl: string;
    problemsPdfUrl: string;
    solutionsPdfUrl: string;
}

export interface ContestResultModel {
    id: number;
    ownerName: string;
    position: number;
}

export interface ContestResultFullModel extends ContestResultModel {
    penalty: number;
    submissions: ProblemResultModel[];
} 