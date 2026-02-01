"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleWare_1 = __importDefault(require("../../middleware/authMiddleWare"));
const user_controller_1 = __importDefault(require("./user.controller"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Работа с пользователями
 */
/**
 * @swagger
 * /user/getAllUsers:
 *   get:
 *     summary: Получить всех пользователей
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       role:
 *                         type: string
 *                       profile_photo:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 */
router.get("/getAllUsers", authMiddleWare_1.default, user_controller_1.default.getAllUsers);
/**
 * @swagger
 * /user/getOneUser/{id}:
 *   get:
 *     summary: Получить пользователя по ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Пользователь найден
 *       404:
 *         description: Пользователь не найден
 */
router.get("/getOneUser/:id", authMiddleWare_1.default, user_controller_1.default.getOneUser);
/**
 * @swagger
 * /user/updateUser/{id}:
 *   patch:
 *     summary: Обновить пользователя
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               profile_photo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Пользователь обновлён
 */
router.patch("/updateUser/:id", authMiddleWare_1.default, user_controller_1.default.updateUser);
/**
 * @swagger
 * /user/deleteUser/{id}:
 *   delete:
 *     summary: Удалить пользователя
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Пользователь удалён
 */
router.delete("/deleteUser/:id", authMiddleWare_1.default, user_controller_1.default.deleteUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map