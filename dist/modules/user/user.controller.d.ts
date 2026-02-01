import { Request, Response } from "express";
declare const _default: {
    getAllUsers: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getOneUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
