import { FixturesRepository } from "./fixtures.repository";
import { z } from "zod";
import { fixtureSchema } from "./fixture.schema";

type Fixture = z.infer<typeof fixtureSchema>;

const repository = new FixturesRepository();

const fixturesService = {
  getAllFixtures: async (): Promise<Fixture[]> => {
    return repository.getAllFixtures();
  },

  getFixtureById: async (id: number): Promise<Fixture | null> => {
    return repository.getFixtureById(id);
  },

  updateFixture: async (
    id: number,
    updatedData: Partial<Fixture>
  ): Promise<number> => {
    return repository.updateMatchFixture(id, updatedData);
  },
};

export default fixturesService;