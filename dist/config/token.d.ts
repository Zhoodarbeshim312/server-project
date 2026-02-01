export type TokenPayload = {
    userId: number;
    emailId: string;
    role: "USER" | "ADMIN";
};
export declare const generateToken: (userId: number, emailId: string, role: "USER" | "ADMIN") => string;
export declare const verifyToken: (token: string) => TokenPayload;
