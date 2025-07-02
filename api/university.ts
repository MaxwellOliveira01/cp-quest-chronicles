import { LocalModel } from "./local";
import { PersonModel } from "./person";
import { TeamModel } from "./team";

export interface UniversityModel {
    id: string;
    name: string;
    alias: string;
}

export interface UniversityFullModel extends UniversityModel {
    local: LocalModel;
    students: PersonModel[];
    teams: TeamModel[];
    // contests: ContestModel[];
}

export interface CreateUniversityModel {
    name: string;
    alias: string;
    localId?: string;
}

export interface UpdateUniversityModel extends CreateUniversityModel {
    id: string;
}
