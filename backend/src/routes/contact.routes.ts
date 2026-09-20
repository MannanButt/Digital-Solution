import { Router } from "express";
import type { AppEnv } from "../config/env.js";
import { createContactController } from "../controllers/contact.controller.js";
import { createContactRateLimit } from "../middleware/rate-limit.js";
import { validateBody } from "../middleware/validate.js";
import { contactRequestSchema } from "../schemas/contact.schema.js";
import type { ContactService } from "../services/contact.service.js";

export function createContactRouter(service: ContactService, env: AppEnv): Router {
  const router = Router();

  router.post(
    "/contact",
    createContactRateLimit(env),
    validateBody(contactRequestSchema),
    createContactController(service),
  );

  return router;
}
