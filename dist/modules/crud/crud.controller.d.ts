import { Request, Response } from "express";
declare const _default: {
    createTask: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getAllTasks: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getTaskById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateTask: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteTask: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
