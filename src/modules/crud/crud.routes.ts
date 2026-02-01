import { Router } from "express";
import crudController from "./crud.controller";
import authMiddleWare from "../../middleware/authMiddleWare";

const router = Router();

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
router.get("/getAllTasks", authMiddleWare, crudController.getAllTasks);

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
router.get("/getOneTask/:id", authMiddleWare, crudController.getTaskById);

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
router.post("/createTask", authMiddleWare, crudController.createTask);

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
router.patch("/updateTask/:id", authMiddleWare, crudController.updateTask);

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
router.delete("/deleteTask/:id", authMiddleWare, crudController.deleteTask);

export default router;
