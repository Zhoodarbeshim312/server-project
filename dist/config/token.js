"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET)
    throw new Error("JWT_SECRET не установлен в .env");
const generateToken = (userId, emailId, role) => {
    return jsonwebtoken_1.default.sign({
        id: userId,
        email: emailId,
        role,
    }, JWT_SECRET, {
        expiresIn: "1d",
        algorithm: "HS256",
    });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        return {
            userId: decoded.id,
            emailId: decoded.email,
            role: decoded.role,
        };
    }
    catch (err) {
        throw new Error("Невалидный или просроченный токен");
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=token.js.map