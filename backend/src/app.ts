import fixtures from "./modules/fixtures/fixtures.routes";
import express from "express";
import { errorHandler, notFoundHandler } from "./middlewares/error-handler";

const app = express();

// Middleware
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/v1/fixtures", fixtures);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;