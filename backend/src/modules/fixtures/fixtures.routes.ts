import express, { type Request, type Response } from "express";
import { z } from "zod";
import { fixtureSchema } from "./fixture.schema";
import fixtureController from "./fixtures.controller";

type Fixture = z.infer<typeof fixtureSchema>;

const fixtures = express.Router();

// GET all fixtures
fixtures.get("/", fixtureController.getAllFixtures);

// GET fixture by id
fixtures.get("/:id", fixtureController.getFixtureById);

// PATCH update fixture
fixtures.patch("/:id", fixtureController.updateFixture);

export default fixtures;