import { ContestModel } from "./contest";
import { ProfileModel } from "./profile";

export interface UniversityModel {
    id: number;
    name: string;
}

export interface UniversityFullModel extends UniversityModel {
    students: ProfileModel[];
    contests: ContestModel[];
}