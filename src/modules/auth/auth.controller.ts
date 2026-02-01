import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "../../config/token";

const register = async (req: Request, res: Response) => {
  try {
    const { profile_photo, name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Все поля (name, email, password) обязательны!",
      });
    }
    const findUser = await prisma.user.findUnique({ where: { email } });
    if (findUser) {
      return res.status(409).json({
        success: false,
        message: "Такой пользователь уже существует!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { profile_photo, name, email, password: hashedPassword },
    });
    const token = generateToken(user.id, user.email, user.role);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      success: true,
      userId: user.id,
      email: user.email,
      name: user.name,
      profile_photo: user.profile_photo,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: `Error in register: ${error.message || error}`,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email и пароль обязательны!",
      });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return res.status(401).json({
        success: false,
        message: "Неверный email или пароль!",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Неверный email или пароль!",
      });
    }
    const token = generateToken(user.id, user.email, user.role);
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: `Error in login: ${error.message || error}`,
    });
  }
};

export default { register, login };
