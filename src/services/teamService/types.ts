
export interface TeamMemberData {
  id: string;
  name: string;
}

export interface TeamMember {
  id: string;
  name: string;
  personId: string;
}

export interface RawTeamData {
  id: string;
  name: string;
  universities?: { name: string } | null;
  member1?: TeamMemberData | null;
  member2?: TeamMemberData | null;
  member3?: TeamMemberData | null;
}

export interface TeamMembership {
  persons: TeamMemberData | null;
}

export interface ContestPerformance {
  position: number;
  contests: {
    id: string;
    name: string;
    year: number;
  };
}
