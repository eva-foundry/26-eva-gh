export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LoggerSink {
    write(entry: { level: LogLevel; message: string; timestamp: string; data?: Record<string, unknown> }): void;
}

export type Logger = {
    debug(message: string, data?: Record<string, unknown>): void;
    info(message: string, data?: Record<string, unknown>): void;
    warn(message: string, data?: Record<string, unknown>): void;
    error(message: string, data?: Record<string, unknown>): void;
};

export type LoggerOptions = {
    level?: LogLevel;
    sinks?: LoggerSink[];
};

const levelOrder: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
};

const consoleFns: Record<LogLevel, (msg?: any, ...args: any[]) => void> = {
    debug: console.debug?.bind(console) ?? console.log.bind(console),
    info: console.info?.bind(console) ?? console.log.bind(console),
    warn: console.warn?.bind(console) ?? console.log.bind(console),
    error: console.error?.bind(console) ?? console.log.bind(console)
};

export function createLogger(options: LoggerOptions = {}): Logger {
    const { level = "info", sinks = [] } = options;
    const threshold = levelOrder[level];

    const emit = (lvl: LogLevel, message: string, data?: Record<string, unknown>) => {
        if (levelOrder[lvl] < threshold) return;
        const entry = { level: lvl, message, timestamp: new Date().toISOString(), data };
        for (const sink of sinks) sink.write(entry);
        consoleFns[lvl](`[${entry.timestamp}] ${lvl.toUpperCase()}: ${message}`, data ?? "");
    };

    return {
        debug: (msg, data) => emit("debug", msg, data),
        info: (msg, data) => emit("info", msg, data),
        warn: (msg, data) => emit("warn", msg, data),
        error: (msg, data) => emit("error", msg, data)
    };
}
