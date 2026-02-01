import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
const PORT = Number(process.env.PORT) || 3000;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API docs for my Express app",
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api/v1`,
      },
    ],
  },

  // 👇 ВАЖНО
  apis: ["./src/modules/**/*.routes.ts", "./src/modules/**/*.controller.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app: Express, port: number) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`✅ Swagger Docs running at http://localhost:${port}/docs`);
};
