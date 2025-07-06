export interface SubmissionModel {
    id: string;
    teamResultId: string;
    problemId: string;
    tries: number;
    accepted: boolean;
    penalty: number;
}

export interface SubmissionCreateModel {
    problemId: string;
    tries: number;
    accepted: boolean;
    penalty: number;
}
