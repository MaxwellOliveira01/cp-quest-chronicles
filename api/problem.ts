import { ContestModel } from "./contest";
import { PersonModel } from "./person";

export interface ProblemModel {
    id: string;
    contestId: string;
    name: string;
    label: string;
    order: number;
}

export interface ProblemFullModel extends ProblemModel {
    setter?: PersonModel;
    contest?: ContestModel;
}

export interface ProblemCreateModel {
    name: string;
    label: string;
    order: number;
    contestId: string;
    setterId?: string;
}

export interface ProblemUpdateModel extends ProblemCreateModel {
    id: string;
}