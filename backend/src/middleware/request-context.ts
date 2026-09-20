import { randomUUID } from "node:crypto";
import type { RequestHandler } from "express";

export const requestContext: RequestHandler = (request, response, next) => {
  const incomingRequestId = request.header("x-request-id")?.trim();
  const requestId = incomingRequestId && incomingRequestId.length <= 100
    ? incomingRequestId
    : randomUUID();

  response.setHeader("x-request-id", requestId);
  next();
};
