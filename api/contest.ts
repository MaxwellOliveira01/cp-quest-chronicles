import { LocalModel } from "./local";

export interface ContestModel {
    id: string;
    name: string;
    siteUrl?: string;
    startDate?: Date;
    endDate?: Date;
}

export interface ContestFullModel extends ContestModel {
    local?: LocalModel;
    problem: ProblemModel[];
    // List<TeamResultModel> Ranking
}

export interface ContestCreateModel {
    name: string;
    siteUrl?: string;
    startDate?: Date;
    endDate?: Date;
    localId?: string
}

export interface ContestUpdateModel extends ContestCreateModel {
    id: string;
}
