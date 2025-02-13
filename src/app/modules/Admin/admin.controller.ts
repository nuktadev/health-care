import { NextFunction, Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../../shared/send-response";
import { StatusCodes } from "http-status-codes";

const getAllFromDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const result = await AdminService.getAllFromDb(filters, options);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Admin Create Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAdminById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AdminService.getAdminById(req.params.id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Admin By id Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AdminService.updateAdmin(req.params.id, req.body);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Admin Update Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AdminService.deleteAdmin(req.params.id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Admin Delete Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const softDeleteFromDBAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AdminService.softDeleteFromDBAdmin(req.params.id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Admin SoftDeleteFromDB Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AdminController = {
  getAdminById,
  getAllFromDb,
  updateAdmin,
  deleteAdmin,
  softDeleteFromDBAdmin,
};
