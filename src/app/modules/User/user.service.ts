import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import { prisma } from "../../../shared/prisma";

const createAdmin = async (payload: any) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const userData = {
    email: payload.admin.email,
    password: payload.password,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const admin = await transactionClient.admin.create({
      data: payload.admin,
    });

    return admin;
  });
  return result;
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

const updateUser = async (id: string, payload: any) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return user;
};

const deleteUser = async (id: string) => {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });
  return user;
};

export const UserService = {
  createAdmin,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
