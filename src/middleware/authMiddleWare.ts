import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../config/token";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      emailId?: string;
      role?: "USER" | "ADMIN";
    }
  }
}

const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Требуется Авторизация",
    });
  }
  try {
    const token = authHeader.split(" ")[1] as string;
    const decoded = verifyToken(token);
    req.userId = decoded.userId;
    req.emailId = decoded.emailId;
    req.role = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Токен недействителен",
    });
  }
};
export default authMiddleWare;
