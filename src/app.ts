import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import globalRouter from "./routes/routes";
const buildApp = () => {
  const app = express();
  const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  };
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(cookieParser());
  app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
  app.use("/assets", express.static(path.join(__dirname, "..", "assets")));
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
