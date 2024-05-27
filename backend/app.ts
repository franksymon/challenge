import express from "express";
import cors from "cors";


// initialize the express server
export const app = express();

// controllers
import { globalErrorHandler } from "./controller/errorsController";

// Enable CORS
app.use(cors());

// Enable incoming JSON data
app.use(express.json());

// routes
import userRoutes from "./routes/userRoutes";
import noteRoutes from "./routes/noteRoutes";
import authRoutes from "./routes/authRoutes";


// Prefix for API endpoints
const apiPrefix = "/api/v1";

// Endpoints
app.use(`${apiPrefix}/users`, userRoutes);
app.use(`${apiPrefix}/notes`, noteRoutes);
app.use(`${apiPrefix}/auth`, authRoutes);

// Health check
app.get(`${apiPrefix}/healthcheck`, (req, res) => {
  res.send("¡Okay!");
});


// Global error handler
app.use("*", globalErrorHandler);
