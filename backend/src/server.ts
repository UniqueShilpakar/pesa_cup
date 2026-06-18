import app from "./app";
import { initializeSchema } from "./db/schema";
import { seedAll } from "./db/seed";
import dbSession from "./config/database";


const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Initialize database schema
    console.log("Initializing database schema...");
    initializeSchema();

    // Seed data
    console.log("Seeding database...");
    await seedAll();

    // Start server
    app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
      console.log(`✓ Health check: http://localhost:${PORT}/health`);
      console.log(`✓ Fixtures API: http://localhost:${PORT}/api/v1/fixtures`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    dbSession.close();
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\n✓ Shutting down gracefully...");
  dbSession.close();
  process.exit(0);
});

startServer();
