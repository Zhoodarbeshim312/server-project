import { NextFunction, Request, Response } from "express";
declare global {
    namespace Express {
        interface Request {
            userId?: number;
            emailId?: string;
            role?: "USER" | "ADMIN";
        }
    }
}
declare const authMiddleWare: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default authMiddleWare;
