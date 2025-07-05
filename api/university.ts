import { LocalModel } from "./local";
import { PersonModel } from "./person";
import { TeamModel } from "./team";

export interface UniversityModel {
    id: string;
    name: string;
    alias: string;
}

export interface UniversityFullModel extends UniversityModel {
    local?: LocalModel;
    students: PersonModel[];
    teams: TeamModel[];
}

export interface UniversitySearchModel extends UniversityModel{
    local?: LocalModel
}

export interface UniversityCreateModel {
    name: string;
    alias: string;
    localId?: string;
}

export interface UniversitUpdateModel extends UniversityCreateModel {
    id: string;
}
