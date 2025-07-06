import { SubmissionCreateModel, SubmissionModel } from "./submission";

export interface TeamResultModel {
    teamId: string;
    contestId: string;
    penalty: number;
    position: number;
}

export interface TeamResultFullModel extends TeamResultModel {
    submissions: SubmissionModel[];
}

export interface ResultsExistsModel {
    exists: boolean;
}

export interface TeamResultUpdateModel extends TeamResultModel {
    submissions: SubmissionCreateModel[];

}