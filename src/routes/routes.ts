import { Router } from "express";
import authRouter from "../modules/auth/auth.routes";
import crudRouter from "../modules/crud/crud.routes";
import userRouter from "../modules/user/user.routes";
const globalRouter = Router();
globalRouter.use("/auth", authRouter);
globalRouter.use("/crud", crudRouter);
globalRouter.use("/user", userRouter);
export default globalRouter;
