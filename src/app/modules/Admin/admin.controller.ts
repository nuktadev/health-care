import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../../shared/send-response";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";

const getAllFromDb = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await AdminService.getAllFromDb(filters, options);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin Create Successfully",
    data: result,
  });
});

const getAdminById = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getAdminById(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin By id Successfully",
    data: result,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.updateAdmin(req.params.id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin Update Successfully",
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.deleteAdmin(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin Delete Successfully",
    data: result,
  });
});
const softDeleteFromDBAdmin = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AdminService.softDeleteFromDBAdmin(req.params.id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Admin SoftDeleteFromDB Successfully",
      data: result,
    });
  }
);

export const AdminController = {
  getAdminById,
  getAllFromDb,
  updateAdmin,
  deleteAdmin,
  softDeleteFromDBAdmin,
};
