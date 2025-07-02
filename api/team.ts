import { PersonModel } from "./person";
import { UniversityModel } from "./university";

export interface TeamModel {
    id: string;
    name: string;
}

export interface TeamFullModel extends TeamModel {
    members: PersonModel[];
    university?: UniversityModel;
    // contests: ContestModel[];
}

export interface CreateTeamModel {
    name: string;
    universityId?: string;
    memberIds: string[];
}

export interface UpdateTeamModel extends CreateTeamModel {
    id: string;
}
