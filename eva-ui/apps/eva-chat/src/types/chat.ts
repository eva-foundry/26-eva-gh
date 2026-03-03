export type ChatRole = "user" | "assistant" | "system";

export type ChatMode = "internal" | "external";

export interface ChatMessage {
    id: string;
    role: ChatRole;
    content: string;
    createdAt: string;
}

export interface ChatThread {
    id: string;
    title: string;
    mode: ChatMode;
    locale: string;
    messages: ChatMessage[];
    createdAt: string;
    updatedAt: string;
}
