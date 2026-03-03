// samples/eva-api/azureFunctionExample.ts
// Sketch of an Azure Functions HTTP trigger for /rag/answer.

import { Context, HttpRequest } from '@azure/functions';

interface RagHistoryMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface RagRequest {
  question: string;
  projectId: string;
  history?: RagHistoryMessage[];
}

interface RagAnswer {
  text: string;
}

interface SafetyResult {
  blocked: boolean;
  reason?: string;
  redactedText?: string;
}

interface RagResponse {
  answer: RagAnswer;
  safety?: SafetyResult;
}

async function answerWithRag(req: RagRequest): Promise<RagAnswer> {
  return {
    text: `Demo answer from Azure Function for project '${req.projectId}' with question: ${req.question}`,
  };
}

function runSafetyCheck(text: string): SafetyResult {
  const sinPattern = /\b\d{3}-\d{3}-\d{3}\b/;
  if (sinPattern.test(text)) {
    return {
      blocked: false,
      reason: 'sin-like-pattern-redacted',
      redactedText: text.replace(sinPattern, '[REDACTED_SIN]'),
    };
  }
  return { blocked: false };
}

export default async function httpTrigger(context: Context, req: HttpRequest): Promise<void> {
  if (req.method !== 'POST') {
    context.res = { status: 405, body: 'Method not allowed' };
    return;
  }

  const body = req.body as RagRequest;

  if (!body || typeof body.question !== 'string' || typeof body.projectId !== 'string') {
    context.res = { status: 400, body: { error: 'Invalid RagRequest' } };
    return;
  }

  try {
    const answer = await answerWithRag(body);
    const safety = runSafetyCheck(answer.text);
    const response: RagResponse = {
      answer: safety.redactedText ? { ...answer, text: safety.redactedText } : answer,
      safety,
    };

    context.res = {
      status: 200,
      body: response,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (err: any) {
    context.log.error(err);
    context.res = {
      status: 500,
      body: { error: 'Failed to generate answer' },
    };
  }
}
