export interface ProfileSearchModel {
    id: string;
    name: string;
    handle: string;
    university?: UniversitySearchModel;
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
    univesity?: UniversitySearchModel;
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
    startDate: string; // maybe it should be on fullModel?
    endDate: string;
}

export interface EventFullModel extends EventSearchModel {
    students: ProfileSearchModel[];
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
    university?: UniversitySearchModel;
    members: ProfileSearchModel[];
    contests: ContestPerformanceModel[];
}

export interface ContestFullModel {
    id: string;
    name: string;
    year: string;
    officialPageUrl?: string;
    problemsPdfUrl?: string; // TODO: Remover Url
    solutionsPdfUrl?: string; // TODO: Remover Url
    ranking: TeamResultModel[];
    problems: ProblemFullModel[];
}

export interface TeamResultModel {
    team: TeamSearchModel; // maybe TeamSearchModel | ProfileSearchModel 
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

export interface ProblemFullModel extends ProblemSearchModel { // TODO: criar pagina inteira
    setter: ProfileSearchModel;
}