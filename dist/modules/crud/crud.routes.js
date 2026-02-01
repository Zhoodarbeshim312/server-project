"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crud_controller_1 = __importDefault(require("./crud.controller"));
const authMiddleWare_1 = __importDefault(require("../../middleware/authMiddleWare"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * /crud/getAllTasks:
 *   get:
 *     summary: Получить все задачи
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список задач
 */
router.get("/getAllTasks", authMiddleWare_1.default, crud_controller_1.default.getAllTasks);
/**
 * @swagger
 * /crud/getOneTask/{id}:
 *   get:
 *     summary: Получить задачу по ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID задачи
 *     responses:
 *       200:
 *         description: Задача найдена
 *       404:
 *         description: Задача не найдена
 */
router.get("/getOneTask/:id", authMiddleWare_1.default, crud_controller_1.default.getTaskById);
/**
 * @swagger
 * /crud/createTask:
 *   post:
 *     summary: Создать новую задачу
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Задача успешно создана
 */
router.post("/createTask", authMiddleWare_1.default, crud_controller_1.default.createTask);
/**
 * @swagger
 * /crud/updateTask/{id}:
 *   patch:
 *     summary: Обновить задачу
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID задачи
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Задача успешно обновлена
 */
router.patch("/updateTask/:id", authMiddleWare_1.default, crud_controller_1.default.updateTask);
/**
 * @swagger
 * /crud/deleteTask/{id}:
 *   delete:
 *     summary: Удалить задачу
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID задачи
 *     responses:
 *       200:
 *         description: Задача успешно удалена
 */
router.delete("/deleteTask/:id", authMiddleWare_1.default, crud_controller_1.default.deleteTask);
exports.default = router;
//# sourceMappingURL=crud.routes.js.map