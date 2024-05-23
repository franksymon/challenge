import { Application } from 'express'; 
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Challenge",
            version: "1.0.0",
            description: "Challenge API Nerdcom",
        },
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
    },
    apis: ["./routes/*.ts"],
};

const specs = swaggerJSDoc(options);
const swaggerDocs = (app: Application, port: string) => {
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
    console.log(`Docs available at http://localhost:${port}/api-docs`);
}

export default swaggerDocs
