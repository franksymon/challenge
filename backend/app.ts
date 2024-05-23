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


// Endpoints
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/notes", noteRoutes);

// Health check
app.get("/healthcheck", (req, res) => {
  res.send("¡Okay!");
});


// Global error handler
app.use("*", globalErrorHandler);
