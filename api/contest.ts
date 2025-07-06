import { LocalModel } from "./local";
import { ProblemModel } from "./problem";
import { TeamResultFullModel } from "./teamResult";

export interface ContestModel {
    id: string;
    name: string;
    siteUrl?: string;
    startDate?: string;
    endDate?: string;
}

export interface ContestFullModel extends ContestModel {
    local?: LocalModel;
    problems: ProblemModel[];
    results: TeamResultFullModel[];
}

export interface ContestCreateModel {
    name: string;
    siteUrl?: string;
    startDate?: string;
    endDate?: string;
    localId?: string
}

export interface ContestUpdateModel extends ContestCreateModel {
    id: string;
}
