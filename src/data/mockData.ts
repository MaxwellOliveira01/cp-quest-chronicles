
export const mockProfiles = [
  {
    id: "1",
    name: "Alice Johnson",
    handle: "alice_codes",
    university: "MIT",
    contests: [
      { year: 2020, contest: "ICPC World Finals", position: 15, contestId: "1" },
      { year: 2021, contest: "Google Code Jam", position: 8, contestId: "2" },
      { year: 2022, contest: "Facebook Hacker Cup", position: 12, contestId: "3" },
      { year: 2023, contest: "ICPC Regional", position: 3, contestId: "4" },
    ],
    teams: [
      { name: "MIT Coders", year: 2020, teamId: "1" },
      { name: "Algorithm Masters", year: 2021, teamId: "2" },
      { name: "Code Warriors", year: 2022, teamId: "3" },
    ]
  },
  {
    id: "2",
    name: "Bob Smith",
    handle: "bob_algo",
    university: "Stanford",
    contests: [
      { year: 2019, contest: "ICPC Regional", position: 5, contestId: "4" },
      { year: 2020, contest: "Google Code Jam", position: 20, contestId: "2" },
      { year: 2021, contest: "TopCoder Open", position: 7, contestId: "5" },
    ],
    teams: [
      { name: "Stanford Stars", year: 2019, teamId: "4" },
      { name: "Binary Beasts", year: 2020, teamId: "5" },
    ]
  },
  {
    id: "3",
    name: "Charlie Davis",
    handle: "charlie_cp",
    university: "CMU",
    contests: [
      { year: 2021, contest: "ICPC World Finals", position: 25, contestId: "1" },
      { year: 2022, contest: "Codeforces Round", position: 18, contestId: "6" },
    ],
    teams: [
      { name: "CMU Champions", year: 2021, teamId: "6" },
    ]
  }
];

export const mockUniversities = [
  {
    id: "1",
    name: "MIT",
    students: ["Alice Johnson", "David Wilson", "Emma Brown"],
    contests: ["ICPC World Finals 2020", "Google Code Jam 2021", "ICPC Regional 2023"]
  },
  {
    id: "2",
    name: "Stanford University",
    students: ["Bob Smith", "Frank Miller", "Grace Lee"],
    contests: ["ICPC Regional 2019", "Google Code Jam 2020", "TopCoder Open 2021"]
  },
  {
    id: "3",
    name: "Carnegie Mellon University",
    students: ["Charlie Davis", "Helen Chen", "Ivan Rodriguez"],
    contests: ["ICPC World Finals 2021", "Codeforces Round 2022"]
  }
];

export const mockTeams = [
  {
    id: "1",
    name: "MIT Coders",
    university: "MIT",
    members: ["Alice Johnson", "David Wilson", "Emma Brown"],
    contests: [
      { name: "ICPC World Finals 2020", year: 2020, contestId: "1" },
      { name: "ICPC Regional 2023", year: 2023, contestId: "4" }
    ]
  },
  {
    id: "2",
    name: "Algorithm Masters",
    university: "MIT",
    members: ["Alice Johnson", "Michael Chang", "Sarah Kim"],
    contests: [
      { name: "Google Code Jam 2021", year: 2021, contestId: "2" }
    ]
  },
  {
    id: "3",
    name: "Code Warriors",
    university: "MIT",
    members: ["Alice Johnson", "Tom Anderson", "Lisa Wang"],
    contests: [
      { name: "Facebook Hacker Cup 2022", year: 2022, contestId: "3" }
    ]
  },
  {
    id: "4",
    name: "Stanford Stars",
    university: "Stanford",
    members: ["Bob Smith", "Frank Miller", "Grace Lee"],
    contests: [
      { name: "ICPC Regional 2019", year: 2019, contestId: "4" }
    ]
  },
  {
    id: "5",
    name: "Binary Beasts",
    university: "Stanford",
    members: ["Bob Smith", "Jake Wilson", "Amy Chen"],
    contests: [
      { name: "Google Code Jam 2020", year: 2020, contestId: "2" }
    ]
  },
  {
    id: "6",
    name: "CMU Champions",
    university: "CMU",
    members: ["Charlie Davis", "Helen Chen", "Ivan Rodriguez"],
    contests: [
      { name: "ICPC World Finals 2021", year: 2021, contestId: "1" }
    ]
  }
];

export const mockContests = [
  {
    id: "1",
    name: "ICPC World Finals 2023",
    officialUrl: "https://icpc.global/worldfinals/2023",
    problemsUrl: "https://icpc.global/worldfinals/2023/problems.pdf",
    solutionsUrl: null, // Solutions not available
    teams: [
      { 
        name: "MIT Coders", 
        penalty: 1247, 
        problems: {
          A: true, B: true, C: false, D: true, E: false, F: true, G: true, H: false, I: true, J: false, K: true
        }
      },
      { 
        name: "Stanford Stars", 
        penalty: 1350, 
        problems: {
          A: true, B: true, C: true, D: false, E: true, F: false, G: true, H: true, I: false, J: true, K: false
        }
      },
      { 
        name: "CMU Champions", 
        penalty: 1425, 
        problems: {
          A: true, B: false, C: true, D: true, E: true, F: true, G: false, H: true, I: true, J: false, K: false
        }
      },
      { 
        name: "Berkeley Bytes", 
        penalty: 1502, 
        problems: {
          A: true, B: true, C: false, D: false, E: true, F: true, G: true, H: false, I: false, J: true, K: true
        }
      }
    ]
  },
  {
    id: "2",
    name: "Google Code Jam 2023",
    officialUrl: "https://codingcompetitions.withgoogle.com/codejam",
    problemsUrl: "https://codejam.googleapis.com/2023/problems.pdf",
    solutionsUrl: "https://codejam.googleapis.com/2023/solutions.pdf",
    teams: [
      { 
        name: "Algorithm Masters", 
        penalty: 892, 
        problems: {
          A: true, B: true, C: true, D: true, E: false, F: true
        }
      },
      { 
        name: "Code Warriors", 
        penalty: 945, 
        problems: {
          A: true, B: false, C: true, D: true, E: true, F: false
        }
      }
    ]
  }
];
