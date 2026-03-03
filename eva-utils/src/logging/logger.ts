import type { Logger as PinoLogger, LoggerOptions } from "pino";
import pino from "pino";

import { getTraceContext } from "../otel/context.js";

export type Logger = PinoLogger;

export type CreateLoggerOptions = {
  service?: string;
  level?: LoggerOptions["level"];
  redact?: string[];
  base?: Record<string, unknown>;
};

export function createLogger(opts: CreateLoggerOptions = {}): Logger {
  const logger = pino({
    level: opts.level ?? process.env.LOG_LEVEL ?? "info",
    redact: { paths: opts.redact ?? ["password", "token", "authorization"], censor: "[REDACTED]" },
    base: {
      service: opts.service ?? process.env.SERVICE_NAME ?? "eva-utils",
      env: process.env.NODE_ENV ?? "development",
      ...(opts.base ?? {}),
    },
    hooks: {
      logMethod(inputArgs, method) {
        // Pino signature: logger.info(obj, msg) or logger.info(msg)
        const [first, second] = inputArgs;
        const ctx = getTraceContext();

        if (second !== undefined) {
          // Called as logger.info(obj, msg)
          const obj = first as Record<string, unknown>;
          const msg = second as string;
          (method as (obj: Record<string, unknown>, msg: string) => void).call(this, { ...obj, ...ctx }, msg);
        } else if (typeof first === "string") {
          // Called as logger.info(msg)
          (method as (obj: Record<string, unknown>, msg: string) => void).call(this, ctx, first);
        } else {
          // Called as logger.info(obj)
          const obj = first as Record<string, unknown>;
          (method as (obj: Record<string, unknown>) => void).call(this, { ...obj, ...ctx });
        }
      },
    },
  });

  return logger;
}
