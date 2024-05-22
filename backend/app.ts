import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import { app } from "./server";

// controllers
import { globalErrorHandler } from "./controller/errorsController";

// routes



// Enable CORS
app.use(cors());

// Enable incoming JSON data
app.use(express.json());

// Enable Swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup({
    "openapi": "3.0.0",
    "info": {
      "title": "Challenge API",
      "version": "1.0.0",
      "description": "Documentación de mi API"
    },
    "paths": {
      "/": {
        "get": {
          "summary": "Obtener la página de inicio",
          "responses": {
            "200": {
              "description": "Respuesta exitosa"
            }
          }
        }
      }
    }
  }
  ));


// Endpoints

// Global error handler
app.use('*', globalErrorHandler);