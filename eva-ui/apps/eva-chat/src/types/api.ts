import type { ChatMessage, ChatMode } from "./chat";

export interface ChatCompletionRequest {
    messages: Pick<ChatMessage, "role" | "content">[];
    mode: ChatMode;
    project: string;
    feature: string;
    locale: string;
}

export interface ChatCompletionResponse {
    message: Pick<ChatMessage, "role" | "content">;
}
