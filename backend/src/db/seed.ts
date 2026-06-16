import dbSession from "../config/database";

export async function seedFixtures(): Promise<void> {
  const fixturesData = [
    {
      teamA: "Rising Stars",
      teamB: "Eagles FC",
      date: "2025-06-15",
      time: "14:00",
      venue: "Prabhat Sports Complex",
      status: "upcoming",
      scoreA: null,
      scoreB: null,
    },
    {
      teamA: "Pioneers FC",
      teamB: "Unity FC",
      date: "2025-06-15",
      time: "16:00",
      venue: "Prabhat Sports Complex",
      status: "upcoming",
      scoreA: null,
      scoreB: null,
    },
    {
      teamA: "Batch '18 FC",
      teamB: "Alumni United",
      date: "2025-06-16",
      time: "14:00",
      venue: "Prabhat Sports Complex",
      status: "finished",
      scoreA: 3,
      scoreB: 2,
    },
    {
      teamA: "Phoenix SC",
      teamB: "Titan Kings",
      date: "2025-06-16",
      time: "16:00",
      venue: "Prabhat Sports Complex",
      status: "finished",
      scoreA: 4,
      scoreB: 1,
    },
    {
      teamA: "Elite Warriors",
      teamB: "Metro Strikers",
      date: "2025-06-17",
      time: "14:00",
      venue: "Prabhat Sports Complex",
      status: "finished",
      scoreA: 5,
      scoreB: 2,
    },
    {
      teamA: "Legacy Green",
      teamB: "Fusion United",
      date: "2025-06-17",
      time: "16:00",
      venue: "Prabhat Sports Complex",
      status: "finished",
      scoreA: 3,
      scoreB: 1,
    },
  ];

  // Check if data already exists
  const existing = await dbSession.query("SELECT COUNT(*) as count FROM fixtures");
  if (existing.length > 0 && (existing[0] as any).count > 0) {
    console.log("✓ Fixtures already seeded");
    return;
  }

  for (const fixture of fixturesData) {
    await dbSession.execute(
      `INSERT INTO fixtures (teamA, teamB, date, time, venue, status, scoreA, scoreB)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fixture.teamA,
        fixture.teamB,
        fixture.date,
        fixture.time,
        fixture.venue,
        fixture.status,
        fixture.scoreA,
        fixture.scoreB,
      ]
    );
  }

  console.log("✓ Fixtures seeded successfully");
}

export async function seedScorers(): Promise<void> {
  const scorersData = [
    {
      name: "Aakash Sharma",
      team: "Rising Stars",
      goals: 14,
      assists: 6,
      rank: 1,
      avatar: "AS",
    },
    {
      name: "Bikram Thapa",
      team: "Phoenix SC",
      goals: 12,
      assists: 8,
      rank: 2,
      avatar: "BT",
    },
    {
      name: "Chirag Rai",
      team: "Batch 18 FC",
      goals: 10,
      assists: 5,
      rank: 3,
      avatar: "CR",
    },
    {
      name: "Deepak Gurung",
      team: "Legacy Green",
      goals: 9,
      assists: 7,
      rank: 4,
      avatar: "DG",
    },
    {
      name: "Eshan Karki",
      team: "Eagles FC",
      goals: 8,
      assists: 4,
      rank: 5,
      avatar: "EK",
    },
    {
      name: "Firoz Malla",
      team: "Titan Kings",
      goals: 7,
      assists: 9,
      rank: 6,
      avatar: "FM",
    },
    {
      name: "Gaurav Shrestha",
      team: "Alumni United",
      goals: 7,
      assists: 3,
      rank: 7,
      avatar: "GS",
    },
    {
      name: "Hari Basnet",
      team: "Fusion United",
      goals: 6,
      assists: 6,
      rank: 8,
      avatar: "HB",
    },
  ];

  const existing = await dbSession.query("SELECT COUNT(*) as count FROM scorers");
  if (existing.length > 0 && (existing[0] as any).count > 0) {
    console.log("✓ Scorers already seeded");
    return;
  }

  for (const scorer of scorersData) {
    await dbSession.execute(
      `INSERT INTO scorers (name, team, goals, assists, rank, avatar)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [scorer.name, scorer.team, scorer.goals, scorer.assists, scorer.rank, scorer.avatar]
    );
  }

  console.log("✓ Scorers seeded successfully");
}
