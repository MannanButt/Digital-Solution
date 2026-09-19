function isBenignOutputError(error: unknown) {
  if (typeof error !== "object" || error === null) return false;
  const candidate = error as { code?: unknown; syscall?: unknown };
  return candidate.code === "EOF" || candidate.code === "EPIPE" || candidate.syscall === "write";
}

process.stdout?.on?.("error", (err: unknown) => { if (!isBenignOutputError(err)) console.error(err); });
process.stderr?.on?.("error", (err: unknown) => { if (!isBenignOutputError(err)) console.error(err); });
process.on("uncaughtException", (err: unknown) => {
  if (isBenignOutputError(err)) return;
  console.error(err);
});

import vinext from "vinext";
import { defineConfig, type PluginOption } from "vite";
import hostingConfig from "./.openai/hosting.json" with { type: "json" };
import { sites } from "./build/sites-vite-plugin.ts";

const { r2 } = hostingConfig;

// macOS Seatbelt blocks FSEvents, so Codex previews need polling for HMR.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === "seatbelt";

const localBindingConfig = {
  main: "./backend/worker/index.ts",
  compatibility_flags: ["nodejs_compat"],
  assets: {
    binding: "ASSETS",
  },
  r2_buckets: r2
    ? [
        {
          binding: r2,
          bucket_name: "site-creator-r2",
        },
      ]
    : [],
};

export default defineConfig(async ({ command }) => {
  // Keep Wrangler and Miniflare state project-local. These are non-secret tool
  // settings; application environment belongs in ignored `.env*` files.
  process.env.WRANGLER_WRITE_LOGS ??= "false";
  process.env.WRANGLER_LOG_PATH ??= ".wrangler/logs";
  process.env.MINIFLARE_REGISTRY_PATH ??= ".wrangler/registry";

  const enableCloudflare =
    command === "build" || process.env.ENABLE_CLOUDFLARE === "true";

  const plugins: PluginOption[] = [vinext({ appDir: "./frontend" }), sites()];

  if (enableCloudflare) {
    const { cloudflare } = await import("@cloudflare/vite-plugin");
    plugins.push(
      cloudflare({
        viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
        config: localBindingConfig,
      })
    );
  }

  return {
    publicDir: "frontend/public",
    server: isCodexSeatbeltSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
    plugins,
  };
});
