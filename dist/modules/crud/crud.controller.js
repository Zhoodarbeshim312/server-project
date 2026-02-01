"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../config/prisma");
const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Поля title и description обязательны!",
            });
        }
        const task = await prisma_1.prisma.task.create({
            data: {
                title,
                description,
                userId: req.userId,
            },
        });
        return res.status(201).json({ success: true, task });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message || error,
        });
    }
};
const getAllTasks = async (req, res) => {
    try {
        const tasks = await prisma_1.prisma.task.findMany({
            where: {
                userId: req.userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return res.status(200).json({
            success: true,
            tasks,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error fetching tasks: ${error.message || error}`,
        });
    }
};
const getTaskById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Некорректный ID задачи",
            });
        }
        const task = await prisma_1.prisma.task.findUnique({
            where: { id },
        });
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Задача не найдена",
            });
        }
        return res.status(200).json({
            success: true,
            task,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error fetching task: ${error.message || error}`,
        });
    }
};
const updateTask = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { title, description, completed } = req.body;
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Некорректный ID задачи",
            });
        }
        const task = await prisma_1.prisma.task.update({
            where: { id },
            data: {
                title,
                description,
                completed,
            },
        });
        return res.status(200).json({
            success: true,
            task,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error updating task: ${error.message || error}`,
        });
    }
};
const deleteTask = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Некорректный ID задачи",
            });
        }
        await prisma_1.prisma.task.delete({
            where: { id },
        });
        return res.status(200).json({
            success: true,
            message: "Задача успешно удалена",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error deleting task: ${error.message || error}`,
        });
    }
};
exports.default = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
};
//# sourceMappingURL=crud.controller.js.map