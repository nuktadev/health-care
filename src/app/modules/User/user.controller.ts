import { Request, Response } from "express";
import { UserService } from "./user.service";

const createAdmin = async (req: Request, res: Response) => {
  try {
    const result = await UserService.createAdmin(req.body);
    res.status(201).json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    res.status(500).json({ message: errorMessage });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUsers();
    res.status(200).json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    res.status(500).json({ message: errorMessage });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getUserById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    res.status(500).json({ message: errorMessage });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.updateUser(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    res.status(500).json({ message: errorMessage });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.deleteUser(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    res.status(500).json({ message: errorMessage });
  }
};

export const UserController = {
  createAdmin,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
