import { type Request,type Response } from "express";
import dbSession from "../../config/database.ts";

//Tournament Repository
const tournamentRepository ={
  getTotalTeams: async (): Promise<number> => {
    // Count unique teams from standings table
    const result = await dbSession.query<{ total: number }>("SELECT COUNT(*) AS total FROM standings");
    return result[0]?.total ?? 0;
  },
  getTotalMatches: async (): Promise<number> => {
    // Count matches from fixtures table
    const result = await dbSession.query<{ total: number }>("SELECT COUNT(*) AS total FROM fixtures");
    return result[0]?.total ?? 0;
  },
  getTotalGoals: async (): Promise<number> => {
    // Sum goals from finished fixtures
    const result = await dbSession.query<{ total: number }>(
      "SELECT (COALESCE(SUM(scoreA), 0) + COALESCE(SUM(scoreB), 0)) AS total FROM fixtures WHERE status = 'finished'"
    );
    return result[0]?.total ?? 0;
  },
  getTopScorer: async (): Promise<{ name: string; goals: number } | null> => {
    // Get top scorer from scorers table
    const result = await dbSession.query<{ name: string; goals: number }>(
      "SELECT name, goals FROM scorers ORDER BY goals DESC LIMIT 1"
    );
    return result[0] ?? null;
  },
}

// - Tournament: name, season, venue, organizer, summary stats
const tournamentController = {
  getTournamentMetadata: async (req: Request, res: Response) => {
    try {
      // Mock data for tournament metadata and summary stats
      const tournamentData = {
        name: "Pesa Cup 2026",
        season: "2026",
        venue: "Khwopa Futsal, Bhaktapur",
        organizer: "Pesa Cup Association",
        summaryStats: {
          totalTeams: 16,
          totalMatches: 32,
          totalGoals: 120,
          topScorer: {
            name: "John Doe",
            goals: 10,
          },
        },
      };
      // constructing the response object with tournament metadata and summary stats
      tournamentData.summaryStats = {
        totalTeams: await tournamentRepository.getTotalTeams(),
        totalMatches: await tournamentRepository.getTotalMatches(),
        totalGoals: await tournamentRepository.getTotalGoals(),
        topScorer: await tournamentRepository.getTopScorer() ?? { name: "N/A", goals: 0 },
      }
      res.status(200).json(tournamentData);
    } catch (error) {
      req.log.error({ error }, "Error fetching tournament metadata:");
      res.status(500).json({ error: "Failed to fetch tournament metadata" });
    }   
  }
};

export default tournamentController;