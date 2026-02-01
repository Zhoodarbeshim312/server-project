import "dotenv/config";
import express from "express";
import globalRouter from "./routes/routes";
import cookieParser from "cookie-parser";
const buildApp = () => {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.get("/", (req, res) => {
    res.status(200).json({
      success: true,
      message: "🚀 Server running! Welcome to API",
    });
  });
  app.use("/api/v1", globalRouter);
  return app;
};
export default buildApp;
