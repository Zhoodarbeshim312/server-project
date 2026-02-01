"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../config/prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const token_1 = require("../../config/token");
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const profile_photo = req.file ? `/uploads/${req.file.filename}` : null;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Все поля обязательны!",
            });
        }
        const existingUser = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Пользователь уже существует!",
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma_1.prisma.user.create({
            data: { name, email, password: hashedPassword, profile_photo },
        });
        const token = (0, token_1.generateToken)(user.id, user.email, user.role);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(201).json({ success: true, user });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email и пароль обязательны!",
            });
        }
        const user = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) {
            return res.status(401).json({
                success: false,
                message: "Неверный email или пароль!",
            });
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Неверный email или пароль!",
            });
        }
        const token = (0, token_1.generateToken)(user.id, user.email, user.role);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            success: true,
            userId: user.id,
            email: user.email,
            name: user.name,
            profile_photo: user.profile_photo,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: `Error in login: ${error.message || error}`,
        });
    }
};
exports.default = { register, login };
//# sourceMappingURL=auth.controller.js.map