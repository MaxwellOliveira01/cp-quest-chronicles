
export interface ProfileSearchModel {
    id: string;
    name: string;
    handle: string;
    university: string;
}

export interface UniversitySearchModel {
    id: string;
    name: string;
    location: string;
}

export interface TeamSearchModel {
    id: string;
    name: string;
    members: ProfileSearchModel[];
    university: string;
}

export interface ContestSearchModel {
    id: string;
    name: string;
    year: number;
}

export interface EventSearchModel {
    id: string;
    name: string;
    location: string;
    startDate: string;
    endDate: string;
}

export interface EventFullModel extends EventSearchModel {
    participants: string[];
}

export interface ContestPerformanceModel {
    position: number;
    contest: ContestSearchModel;
}

export interface ProfileFullModel extends ProfileSearchModel {
    teams: TeamSearchModel[];
    events: EventSearchModel[];
    contests: ContestPerformanceModel[];
}

export interface UniversityFullModel {
    id: string;
    name: string;
    location: string;
    students: ProfileSearchModel[];
    teams: TeamSearchModel[];
    contests: ContestSearchModel[];
}

export interface TeamFullModel {
    id: string;
    name: string;
    university: string;
    members: { name: string; profileId: string }[];
    contests: {
        contestId: string;
        name: string;
        year: number;
        problems?: Record<string, {
            solved: boolean;
            submissions?: number;
            timeMinutes?: number;
        }>;
    }[];
}

export interface ContestFullModel {
    id: string;
    name: string;
    year: number;
    officialUrl: string;
    problemsUrl?: string | null;
    solutionsUrl?: string | null;
    problemCount: number;
    teams: string[];
}

export interface TeamResultModel {
    team: TeamSearchModel;
    position: number;
    penalty: number;
    submissions: SubmissionModel[];
}

export interface SubmissionModel {
    problemId: string;
    success: boolean;
    tries: number;
    penalty: number;
}

export interface ProblemSearchModel {
    id: string;
    name: string;
    label: string;
}

export interface ProblemFullModel extends ProblemSearchModel {
    setter: ProfileSearchModel;
}
