import { ContestModel } from "./contest";
import { PersonModel } from "./person";
import { UniversityModel } from "./university";

export interface TeamModel {
    id: string;
    name: string;
}

export interface TeamFullModel extends TeamModel {
    university?: UniversityModel;
    members: PersonModel[];
    contests: ContestModel[];
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
