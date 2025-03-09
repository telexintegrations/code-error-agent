// src/app.ts
import "dotenv/config";
import express, { Express } from "express";
import cors from "cors";

import integrationRoutes from "./routes/integration";
import tickRoutes from "./routes/tick";

function createApp(): Express {
  const app = express();

  app.use(
    cors({
      origin: "https://telex.im",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
    })
  );

  app.use(cors());  
  app.use(express.json());

  
  app.use(integrationRoutes);
  app.use(tickRoutes);

app.get("/", (req, res) => {
  res.status(200).send("API is running");
});

  return app;
}

export default createApp;
