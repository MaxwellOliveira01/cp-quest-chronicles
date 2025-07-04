import { EventModel } from "./event";
import { TeamModel } from "./team";
import { UniversityModel } from "./university";
import { ContestModel } from "./contest";

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
    contest: ContestModel[];
}

export interface PersonCreateModel {
    name: string;
    handle: string;
    universityId?: string;
}

export interface PersonUpdateModel extends PersonCreateModel {
    id: string;
}
