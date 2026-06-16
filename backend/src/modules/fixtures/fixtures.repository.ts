import { z } from "zod";
import dbSession from "../../config/database.ts";
import { fixtureSchema } from "./fixture.schema";

type Fixture = z.infer<typeof fixtureSchema>;

export class FixturesRepository {
    async getAllFixtures(): Promise<Fixture[]> {
        return dbSession.query<Fixture>("SELECT * FROM fixtures");
    }
    async getFixtureById(fixtureId: number): Promise<Fixture | null> {
        const fixtures = await dbSession.query<Fixture>(
            "SELECT * FROM fixtures WHERE id = ?",
            [fixtureId]
        );
        return fixtures?.[0] ?? null;
    } 
    async updateMatchFixture(
    fixtureId: number,
    updatedData: Partial<Fixture>
  ): Promise<number> {
    const updates = Object.entries(updatedData)
      .filter(([_, v]) => v !== undefined)
      .map(([k]) => `${k} = ?`)
      .join(", ");
    const values = Object.entries(updatedData)
      .filter(([_, v]) => v !== undefined)
      .map(([_, v]) => v);

    return dbSession.execute(
      `UPDATE fixtures SET ${updates} WHERE id = ?`,
      [...values, fixtureId]
    );
  }
}