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
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Требуется авторизация",
    });
  }

  try {
    const decoded = verifyToken(token);

    req.userId = decoded.userId;
    req.emailId = decoded.emailId;
    req.role = decoded.role;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Токен недействителен",
    });
  }
};

export default authMiddleWare;
