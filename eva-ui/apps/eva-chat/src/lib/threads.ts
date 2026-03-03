import { ChatMessage } from "../types/chat";
import { DEMO_MODE } from "../config/demo";

const STORAGE_KEY = "eva-chat-threads-v1";

export interface ThreadSummary {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface Thread extends ThreadSummary {
  messages: ChatMessage[];
}

export function loadThreads(): Thread[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Thread[];
  } catch {
    return [];
  }
}

function saveThreads(threads: Thread[]): void {
  if (DEMO_MODE) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
}

export function createThread(initialTitle?: string): Thread[] {
  const threads = loadThreads();
  const now = new Date().toISOString();
  const id = crypto.randomUUID();

  const thread: Thread = {
    id,
    title: initialTitle || "New conversation",
    createdAt: now,
    updatedAt: now,
    messages: [],
  };

  const updated = [thread, ...threads];
  saveThreads(updated);
  return updated;
}

export function updateThread(updatedThread: Thread): Thread[] {
  const threads = loadThreads();
  const updated = threads.map((t) => (t.id === updatedThread.id ? updatedThread : t));
  saveThreads(updated);
  return updated;
}

export function deleteThread(threadId: string): Thread[] {
  const threads = loadThreads().filter((t) => t.id !== threadId);
  saveThreads(threads);
  return threads;
}
