import { create } from "zustand";

type Toast = { id: string; text: string };
type State = {
  toasts: Toast[];
  push: (text: string) => void;
  remove: (id: string) => void;
};

const useToasts = create<State>((set) => ({
  toasts: [],
  push: (text) =>
    set((s) => ({ toasts: [...s.toasts, { id: Math.random().toString(16).slice(2), text }] })),
  remove: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
}));

export default useToasts;