export interface ProblemModel {
    id: number;
    label: string;
    order: number;
    contestId: number;
}

export interface ProblemResultModel {
    problemId: number;
    tries: number;
    penalty: number;
    solved: boolean;
}