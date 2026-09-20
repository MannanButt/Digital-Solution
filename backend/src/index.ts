import { createApp } from "./app.js";
import { getEnv } from "./config/env.js";
import { closeDatabase } from "./db/client.js";
import { logger } from "./utils/logger.js";

const env = getEnv();
const app = createApp({ env });

if (!process.env.VERCEL) {
  const server = app.listen(env.PORT, () => {
    logger.info("API server started", { port: env.PORT, environment: env.NODE_ENV });
  });

  const shutdown = (signal: string) => {
    logger.info("API server stopping", { signal });
    server.close(() => {
      void closeDatabase().finally(() => process.exit(0));
    });
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

export default app;
