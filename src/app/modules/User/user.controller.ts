import { Request, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../../shared/send-response";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createAdmin(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Admin Create Successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User retrieves Successfully",
    data: result,
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getUserById(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User retrieve Successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.updateUser(req.params.id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User update Successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.deleteUser(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User delete Successfully",
    data: result,
  });
});

export const UserController = {
  createAdmin,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
