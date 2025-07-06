import { ContestModel } from "./contest";

export interface ProblemModel {
    id: string;
    contestId: string;
    name: string;
    label: string;
    order: number;
}

export interface ProblemFullModel extends ProblemModel {
    contest?: ContestModel;
}

export interface ProblemCreateModel {
    name: string;
    label: string;
    order: number;
    contestId: string;
}

export interface ProblemUpdateModel extends ProblemCreateModel {
    id: string;
}