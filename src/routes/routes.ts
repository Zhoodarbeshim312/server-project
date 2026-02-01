import { Router } from "express";
import cors from "cors";
import authRouter from "../modules/auth/auth.routes";
import crudRouter from "../modules/crud/crud.routes";
import userRouter from "../modules/user/user.routes";
const globalRouter = Router();
const corsConfig = {
  origin: ["http://localhost:3000", "http://localhost:5173"],
  credentials: true,
};
globalRouter.use("/auth", cors(corsConfig), authRouter);
globalRouter.use("/crud", cors(corsConfig), crudRouter);
globalRouter.use("/user", cors(corsConfig), userRouter);
export default globalRouter;
