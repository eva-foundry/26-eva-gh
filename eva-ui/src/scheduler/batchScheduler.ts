import type { Logger } from "../logging/logger";

export type BatchTask = {
    id: string;
    class: string;
    priority?: number;
    dependencies?: string[];
    payload: { run: () => Promise<void> };
};

export type BatchSchedulerOptions = {
    maxConcurrent?: number;
};

const noopLogger: Logger = {
    debug: () => { },
    info: () => { },
    warn: () => { },
    error: () => { }
};

export class BatchScheduler {
    private queue = Promise.resolve();
    private stopped = false;

    constructor(private logger: Logger = noopLogger, private options: BatchSchedulerOptions = {}) {
        void this.options;
    }

    submit(task: BatchTask) {
        if (this.stopped) return this.queue;
        const runTask = async () => {
            try {
                await task.payload.run();
            } catch (err) {
                this.logger.error(`Batch task ${task.id} failed`, { error: err as Error });
            }
        };
        this.queue = this.queue.then(() => runTask());
        return this.queue;
    }

    stop() {
        this.stopped = true;
        return this.queue;
    }
}
