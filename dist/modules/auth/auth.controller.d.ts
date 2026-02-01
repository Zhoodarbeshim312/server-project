import { Request, Response } from "express";
declare const _default: {
    register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
export default _default;
