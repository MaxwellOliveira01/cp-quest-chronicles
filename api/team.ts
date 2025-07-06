import { PersonModel } from "./person";
import { TeamResultModel } from "./teamResult";
import { UniversityModel } from "./university";

export interface TeamModel {
    id: string;
    name: string;
}

export interface TeamFullModel extends TeamModel {
    university?: UniversityModel;
    members: PersonModel[];
    results: TeamResultModel[]
}

export interface TeamSearchModel extends TeamModel {
    university?: UniversityModel;
}

export interface TeamCreateModel {
    name: string;
    universityId?: string;
    memberIds: string[];
}

export interface TeamUpdateModel extends TeamCreateModel {
    id: string;
}
