"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../config/prisma");
const getAllUsers = async (_req, res) => {
    try {
        const users = await prisma_1.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                profile_photo: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return res.status(200).json({
            success: true,
            users,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error fetching users: ${error.message || error}`,
        });
    }
};
const getOneUser = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id))
            return res.status(400).json({
                success: false,
                message: "Некорректный ID пользователя",
            });
        const user = await prisma_1.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                profile_photo: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user)
            return res.status(404).json({
                success: false,
                message: "Пользователь не найден",
            });
        return res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error fetching user: ${error.message || error}`,
        });
    }
};
const updateUser = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, email, password, role, profile_photo } = req.body;
        if (isNaN(id))
            return res.status(400).json({
                success: false,
                message: "Некорректный ID пользователя",
            });
        const user = await prisma_1.prisma.user.update({
            where: { id },
            data: { name, email, password, role, profile_photo },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                profile_photo: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error updating user: ${error.message || error}`,
        });
    }
};
const deleteUser = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id))
            return res.status(400).json({
                success: false,
                message: "Некорректный ID пользователя",
            });
        const user = await prisma_1.prisma.user.findUnique({ where: { id } });
        if (!user)
            return res.status(404).json({
                success: false,
                message: "Пользователь не найден",
            });
        await prisma_1.prisma.user.delete({ where: { id } });
        return res.status(200).json({
            success: true,
            message: "Пользователь успешно удалён",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error deleting user: ${error.message || error}`,
        });
    }
};
exports.default = {
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
};
//# sourceMappingURL=user.controller.js.map