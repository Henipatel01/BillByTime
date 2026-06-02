import AppError from "../Model/AppError.js";
import type { Request, Response, NextFunction } from "express";
const errorMiddleware = (err:unknown, req:Request, res:Response, next:NextFunction) => {
if (err instanceof AppError) {
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
}
    if (err instanceof Error) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }

  // Handle unknown errors
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};




export default errorMiddleware;