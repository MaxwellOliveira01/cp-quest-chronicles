import { ContestResultModel } from "./contest";
import { ProfileModel } from "./profile";

export interface TeamModel {
    id: number;
    name: string;
}

export interface TeamMembersModel extends TeamModel {
    members: ProfileModel[];
}

export interface TeamFullModel extends TeamMembersModel {
    contests: ContestResultModel[];
}