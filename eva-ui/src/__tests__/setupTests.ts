import "@testing-library/jest-dom/vitest";
import { TextEncoder, TextDecoder } from "util";

if (!(globalThis as any).TextEncoder) {
    (globalThis as any).TextEncoder = TextEncoder;
}

if (!(globalThis as any).TextDecoder) {
    (globalThis as any).TextDecoder = TextDecoder;
}

if (!(globalThis as any).ResizeObserver) {
    (globalThis as any).ResizeObserver = class {
        observe() { }
        unobserve() { }
        disconnect() { }
    };
}
