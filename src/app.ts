// src/app.ts
import "dotenv/config";
import express, { Express } from "express";
import cors from "cors";
// import config from "./config";
// import LogParser from "./logParser";

// Import middleware and route modules
// import { logger } from "../middleware/logger";
import integrationRoutes from "./routes/integration";
// import webhookRoutes from "../routes/webhook";
import tickRoutes from "./routes/tick";

function createApp(): Express {
  const app = express();

  // Apply CORS and JSON parsing middleware
  app.use(
    cors({
      origin: "https://telex.im",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
    })
  );

  app.use(cors());  // Allow all origins during testing
  app.use(express.json());

  // Debug middleware to log requests
//   app.use(logger);

  // Validate configuration and initialize log parser (for a Code Error Agent, we expect a codeBasePath)
//   if (!config || !config.codeBasePath) {
//     console.error("[2025-02-20 22:25:37] Invalid configuration:", config);
//     throw new Error("Configuration missing required codeBasePath");
//   }
//   const logParser = new LogParser(config);
  // Optionally attach logParser to app.locals for access in routes if needed
//   app.locals.logParser = logParser;

  // Register routes from modular files
  app.use(integrationRoutes);
  app.use(tickRoutes);

// Add this before returning the app
app.get("/", (req, res) => {
  res.status(200).send("API is running");
});

  return app;
}

export default createApp;
