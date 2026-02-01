import "dotenv/config";
import express from "express";
import globalRouter from "./routes/routes";
import cookieParser from "cookie-parser";
import path from "path";
const buildApp = () => {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
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
