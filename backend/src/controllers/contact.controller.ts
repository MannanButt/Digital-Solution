import type { RequestHandler } from "express";
import type { ContactRequest } from "../schemas/contact.schema.js";
import type { ContactService } from "../services/contact.service.js";

export function createContactController(service: ContactService): RequestHandler {
  return async (request, response, next) => {
    try {
      await service.submit(request.body as ContactRequest);
      response.status(201).json({
        success: true,
        data: {
          message: "Your request has been received. We will be in touch shortly.",
        },
      });
    } catch (error) {
      next(error);
    }
  };
}
