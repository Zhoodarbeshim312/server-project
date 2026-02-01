import "express";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      emailId?: string;
      role?: "USER" | "ADMIN";
    }
  }
}
