export class RingBufferSink {
    private buffer: string[] = [];

    constructor(private capacity = 100) { }

    write(entry: { level: string; message: string; timestamp: string; data?: Record<string, unknown> }) {
        const payload = JSON.stringify(entry);
        this.buffer.push(payload);
        if (this.buffer.length > this.capacity) {
            this.buffer.shift();
        }
    }

    entries() {
        return [...this.buffer];
    }

    clear() {
        this.buffer = [];
    }
}
