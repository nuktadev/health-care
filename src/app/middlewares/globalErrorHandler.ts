import { NextFunction, Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.name || "Something went wrong!",
    error: err,
  });
};

export default globalErrorHandler;
