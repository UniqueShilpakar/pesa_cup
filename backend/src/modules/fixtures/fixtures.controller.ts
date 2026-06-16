import { type Request, type Response } from "express";
import fixtureService from "./fixtures.service";
import { fixtureSchema } from "./fixture.schema";
import { z } from "zod";

type Fixture = z.infer<typeof fixtureSchema>;

const fixtureController = {
  getAllFixtures: async (req: Request, res: Response): Promise<void> => {
    const result = await fixtureService.getAllFixtures();
    res.json(result);
  },

  getFixtureById: async (req: Request, res: Response): Promise<void> => {
    const fixtureId = parseInt(req.params.id);
    const result = await fixtureService.getFixtureById(fixtureId);
    if (!result) {
      res.status(404).json({ error: `Fixture with id ${fixtureId} not found` });
      return;
    }
    res.json(result);
  },

  updateFixture: async (req: Request, res: Response): Promise<void> => {
    const fixtureId = parseInt(req.params.id);
    const updatedData = req.body as Partial<Fixture>;

    const changes = await fixtureService.updateFixture(fixtureId, updatedData);
    if (changes === 0) {
      res
        .status(404)
        .json({ error: `Fixture with id ${fixtureId} not found` });
      return;
    }

    res.json({ message: `Fixture with id ${fixtureId} updated successfully` });
  },
};

export default fixtureController;