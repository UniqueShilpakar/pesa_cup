import fixtures from "./modules/fixtures/fixtures.routes";
import express from "express";
import { errorHandler, notFoundHandler } from "./middlewares/error-handler";
import cors from "cors";

import pinoHttp from "pino-http";

// Set up logging
export const logger = pinoHttp();

const app = express();
app.use(logger);

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS ?? "*"; // Allow all origins (for development)
const allowedOrigins = [
  ALLOWED_ORIGINS, // Allow all origins (for development)
  "http://localhost:3000", // React development server
  "http://localhost:5173", // Vite development server
  "https://worldcup2022.com", // Production frontend URL
];

const corsOptions = {
  origin: allowedOrigins, // Allow all origins (for development)
  methods: "*",
  allowedHeaders: "*",
};

app.use(cors(corsOptions));
// Middleware
app.use(express.json());

// Health check
app.get("/api/v1/health", (req, res) => {
  req.log.info("Health check endpoint hit");
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/v1/fixtures", fixtures);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;