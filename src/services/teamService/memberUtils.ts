
import { TeamMemberData, TeamMember, TeamMembership } from './types';

export function processDirectMember(member: TeamMemberData | null | undefined): TeamMember | null {
  if (!member || typeof member !== 'object' || !member.id || !member.name) {
    return null;
  }
  
  return {
    id: member.id,
    name: member.name,
    personId: member.id
  };
}

export function combineTeamMembers(
  member1: TeamMemberData | null | undefined,
  member2: TeamMemberData | null | undefined,
  member3: TeamMemberData | null | undefined,
  junctionMembers: TeamMembership[] = []
): TeamMember[] {
  const allMembers: TeamMember[] = [];
  
  // Add direct members
  const directMembers = [member1, member2, member3];
  directMembers.forEach(member => {
    const processedMember = processDirectMember(member);
    if (processedMember) {
      allMembers.push(processedMember);
    }
  });

  // Add junction table members (avoid duplicates)
  const existingIds = new Set(allMembers.map(m => m.id));
  junctionMembers.forEach(tm => {
    if (tm.persons && !existingIds.has(tm.persons.id)) {
      allMembers.push({
        id: tm.persons.id,
        name: tm.persons.name,
        personId: tm.persons.id
      });
    }
  });
  
  return allMembers;
}
