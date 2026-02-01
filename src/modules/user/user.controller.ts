import { Request, Response } from "express";
import { prisma } from "../../config/prisma";

const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
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
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: `Error fetching users: ${error.message || error}`,
    });
  }
};

const getOneUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({
        success: false,
        message: "Некорректный ID пользователя",
      });
    const user = await prisma.user.findUnique({
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
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: `Error fetching user: ${error.message || error}`,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, email, password, role, profile_photo } = req.body;
    if (isNaN(id))
      return res.status(400).json({
        success: false,
        message: "Некорректный ID пользователя",
      });
    const user = await prisma.user.update({
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
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: `Error updating user: ${error.message || error}`,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({
        success: false,
        message: "Некорректный ID пользователя",
      });
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "Пользователь не найден",
      });
    await prisma.user.delete({ where: { id } });
    return res.status(200).json({
      success: true,
      message: "Пользователь успешно удалён",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: `Error deleting user: ${error.message || error}`,
    });
  }
};

export default {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
};
