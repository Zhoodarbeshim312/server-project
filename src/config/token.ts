import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error("JWT_SECRET не установлен в .env");
export type TokenPayload = {
  userId: number;
  emailId: string;
  role: "USER" | "ADMIN";
};
export const generateToken = (
  userId: number,
  emailId: string,
  role: "USER" | "ADMIN",
): string => {
  return jwt.sign(
    {
      id: userId,
      email: emailId,
      role,
    },
    JWT_SECRET,
    {
      expiresIn: "1d",
      algorithm: "HS256",
    },
  );
};
export const verifyToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: number;
      email: string;
      role: "USER" | "ADMIN";
    };
    return {
      userId: decoded.id,
      emailId: decoded.email,
      role: decoded.role,
    };
  } catch (err) {
    throw new Error("Невалидный или просроченный токен");
  }
};
