import { ContestResultModel } from "./contest";
import { EventModel } from "./events";
import { TeamModel } from "./team";
import { UniversityModel } from "./university";

export interface ProfileModel {
    id: number;
    name: string;
    handle: string;
    university: UniversityModel;
}

export interface ProfileFullModel extends ProfileModel {
    contests: ContestResultModel[];
    teams: TeamModel[];
    events: EventModel[];
}