import { rateLimit } from "express-rate-limit";
import type { AppEnv } from "../config/env.js";

export function createContactRateLimit(env: AppEnv) {
  return rateLimit({
    windowMs: env.CONTACT_RATE_LIMIT_WINDOW_MS,
    limit: env.CONTACT_RATE_LIMIT_MAX,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    handler: (_request, response) => {
      response.status(429).json({
        success: false,
        error: {
          code: "RATE_LIMITED",
          message: "Too many contact requests. Please try again later.",
        },
      });
    },
  });
}
