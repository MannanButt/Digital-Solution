import compression from "compression";
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import type { AppEnv } from "./config/env.js";
import { getEnv } from "./config/env.js";
import { AppError } from "./errors/app-error.js";
import { errorHandler } from "./middleware/error-handler.js";
import { notFound } from "./middleware/not-found.js";
import { requestContext } from "./middleware/request-context.js";
import { contactRepository } from "./repositories/contact.repository.js";
import { createApiRouter } from "./routes/index.js";
import { DefaultContactService, type ContactService } from "./services/contact.service.js";
import { emailService } from "./services/email.service.js";

export interface AppDependencies {
  env?: AppEnv;
  contactService?: ContactService;
}

export function createApp(dependencies: AppDependencies = {}): Express {
  const env = dependencies.env ?? getEnv();
  const contactService = dependencies.contactService
    ?? new DefaultContactService(contactRepository, emailService);
  const allowedOrigins = new Set(env.corsOrigins);
  const app = express();

  app.disable("x-powered-by");
  app.set("trust proxy", 1);
  app.use(requestContext);
  app.use(helmet());
  app.use(compression());
  app.use(cors({
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "X-Request-Id"],
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin.replace(/\/$/, ""))) {
        callback(null, true);
        return;
      }
      callback(new AppError(403, "ORIGIN_NOT_ALLOWED", "This origin is not allowed."));
    },
  }));
  app.use(express.json({ limit: "32kb" }));

  app.get("/", (_request, response) => {
    response.status(200).json({
      success: true,
      data: {
        service: "digital-solutions-api",
        health: "/api/health",
      },
    });
  });
  app.use("/api", createApiRouter(contactService, env));

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
