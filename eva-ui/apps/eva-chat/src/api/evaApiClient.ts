import { logEvent } from "../lib/telemetry";

export type ChatMode = "internal" | "external";

export interface EvaChatRequest {
  threadId: string;
  messages: { role: "user" | "assistant"; content: string }[];
  mode: ChatMode;
  locale: string;
}

export interface EvaChatResponse {
  reply: string;
}

const FALLBACK_REPLY =
  "(EVA is temporarily unavailable; this is a fallback response.)";

export async function sendChatCompletion(
  req: EvaChatRequest
): Promise<EvaChatResponse> {
  const env = import.meta.env;
  const baseUrl = (env.VITE_EVA_API_BASE_URL ?? "").replace(/\/+$/, "");
  const subscriptionKey = env.VITE_EVA_API_SUBSCRIPTION_KEY ?? "";
  const useMock = (env.VITE_EVA_API_USE_MOCK ?? "true")
    .toString()
    .toLowerCase() === "true";

  if (useMock || !baseUrl) {
    logEvent("chat_mock_response", { mode: req.mode, locale: req.locale });
    return buildMockReply(req);
  }

  try {
    const response = await fetch(`${baseUrl}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        "x-project": "EVA-UI",
        "x-feature": "UnifiedChatFrame",
        "x-app": "eva-chat",
        "x-env": "dev",
        "x-cost-center": "AICOE",
        "x-mode": req.mode,
        "x-locale": req.locale,
      },
      body: JSON.stringify(req),
    });

    if (!response.ok) {
      console.error("EVA APIM returned an error", {
        status: response.status,
        statusText: response.statusText,
      });
      logEvent("chat_api_error", {
        status: response.status,
        statusText: response.statusText,
      });
      return { reply: FALLBACK_REPLY };
    }

    const payload = await response.json().catch((error: unknown) => {
      console.error("Failed to parse EVA APIM response", error);
      logEvent("chat_api_error", {
        message: error instanceof Error ? error.message : "unknown",
      });
      return undefined;
    });

    const reply = coerceReply(payload);

    if (!reply) {
      console.error("EVA APIM response missing reply field", payload);
      logEvent("chat_api_error", { reason: "missing_reply" });
      return { reply: FALLBACK_REPLY };
    }

    logEvent("chat_api_success", {
      threadId: req.threadId,
      messageCount: req.messages.length,
    });

    return { reply };
  } catch (error) {
    console.error("EVA APIM call failed", error);
    logEvent("chat_api_error", {
      message: error instanceof Error ? error.message : "unknown",
    });
    return { reply: FALLBACK_REPLY };
  }
}

function buildMockReply(req: EvaChatRequest): EvaChatResponse {
  const lastMessage = req.messages[req.messages.length - 1];
  const echo = lastMessage?.content ?? "I am ready.";
  const reply = `(Mock EVA ${req.mode}/${req.locale}) ${echo}`;
  return { reply };
}

function coerceReply(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const data = payload as {
    reply?: unknown;
    content?: unknown;
    message?: { content?: unknown };
  };

  if (typeof data.reply === "string") {
    return data.reply;
  }

  if (typeof data.content === "string") {
    return data.content;
  }

  if (data.message && typeof data.message.content === "string") {
    return data.message.content;
  }

  return null;
}
