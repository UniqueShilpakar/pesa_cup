import {z} from "zod";
import dbSession from "../../config/database.ts";
import {scorerSchema} from "./scorers.schema";
type Scorer = z.infer<typeof scorerSchema>;

export class ScorersRepository {
    async getAllScorers(): Promise<Scorer[]> {
        return dbSession.query<Scorer>("SELECT * FROM scorers");
    }
    async getScorerById(scorerId: number): Promise<Scorer | null> {
        const scorers = await dbSession.query<Scorer>(
            "SELECT * FROM scorers WHERE id = ?",
            [scorerId]
        );
        return scorers?.[0] ?? null;
    } 
}
