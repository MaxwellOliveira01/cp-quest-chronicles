import { EventModel } from "./event";
import { TeamModel } from "./team";
import { UniversityModel } from "./university";

export interface PersonModel {
    id: string;
    name: string;
    handle: string;
}

export interface PersonSearchModel extends PersonModel {
    university?: UniversityModel;
}

export interface PersonFullModel extends PersonModel {
    university?: UniversityModel;
    teams: TeamModel[];
    events: EventModel[];
    // contest: ContestModel[];
}

export interface CreatePersonModel {
    name: string;
    handle: string;
    universityId?: string;
}

export interface UpdatePersonModel extends CreatePersonModel {
    id: string;
}
