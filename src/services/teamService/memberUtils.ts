
import { TeamMemberData, TeamMember, TeamMembership } from './types';

export function combineTeamMembers(
  member1: TeamMemberData | null,
  member2: TeamMemberData | null,
  member3: TeamMemberData | null,
  teamMemberships: TeamMembership[]
): TeamMember[] {
  const allMembers: TeamMember[] = [];
  
  // Add direct members (member1, member2, member3)
  if (member1) {
    allMembers.push({
      id: member1.id,
      name: member1.name,
      personId: member1.id
    });
  }
  
  if (member2) {
    allMembers.push({
      id: member2.id,
      name: member2.name,
      personId: member2.id
    });
  }
  
  if (member3) {
    allMembers.push({
      id: member3.id,
      name: member3.name,
      personId: member3.id
    });
  }
  
  // Add members from junction table, avoiding duplicates
  const existingIds = new Set(allMembers.map(m => m.personId));
  
  teamMemberships.forEach(membership => {
    if (membership.persons && !existingIds.has(membership.persons.id)) {
      allMembers.push({
        id: membership.persons.id,
        name: membership.persons.name,
        personId: membership.persons.id
      });
    }
  });
  
  return allMembers;
}
