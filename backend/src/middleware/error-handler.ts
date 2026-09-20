import type { ErrorRequestHandler } from "express";
import { AppError } from "../errors/app-error.js";
import { logger } from "../utils/logger.js";

export const errorHandler: ErrorRequestHandler = (error: unknown, request, response, _next) => {
  const requestId = response.getHeader("x-request-id");

  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        ...(error.details ? { details: error.details } : {}),
      },
      requestId,
    });
    return;
  }

  logger.error("Unhandled request error", {
    error,
    method: request.method,
    path: request.path,
    requestId,
  });

  response.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "The request could not be processed.",
    },
    requestId,
  });
};
