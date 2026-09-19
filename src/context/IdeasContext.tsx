"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { Idea, IdeaPatch, Metrics } from "@/lib/types";

export type SaveState = "idle" | "pending" | "saved" | "error";

export type IdeaFieldPatch = Partial<
  Omit<Idea, "id" | "order" | "createdAt" | "updatedAt" | "metrics">
> & { metrics?: Partial<Metrics> };

interface IdeasContextValue {
  ideas: Idea[];
  loading: boolean;
  error: string | null;
  saveStates: Record<string, SaveState>;
  updateIdea: (id: string, patch: IdeaFieldPatch) => void;
  createIdea: () => Promise<void>;
  deleteIdea: (id: string) => Promise<void>;
}

const IdeasContext = createContext<IdeasContextValue | null>(null);

function flattenPatch(patch: IdeaFieldPatch): IdeaPatch {
  const flat: IdeaPatch = {};
  if (patch.title !== undefined) flat.title = patch.title;
  if (patch.type !== undefined) flat.type = patch.type;
  if (patch.trigger !== undefined) flat.trigger = patch.trigger;
  if (patch.status !== undefined) flat.status = patch.status;
  if (patch.format !== undefined) flat.format = patch.format;
  if (patch.summary !== undefined) flat.summary = patch.summary;
  if (patch.script !== undefined) flat.script = patch.script;
  if (patch.postStatus !== undefined) flat.postStatus = patch.postStatus;
  if (patch.perfNotes !== undefined) flat.perfNotes = patch.perfNotes;
  if (patch.metrics) {
    if (patch.metrics.views !== undefined) flat.metricViews = patch.metrics.views;
    if (patch.metrics.comments !== undefined) flat.metricComments = patch.metrics.comments;
    if (patch.metrics.shares !== undefined) flat.metricShares = patch.metrics.shares;
    if (patch.metrics.saves !== undefined) flat.metricSaves = patch.metrics.saves;
    if (patch.metrics.followers !== undefined) flat.metricFollowers = patch.metrics.followers;
  }
  return flat;
}

const SAVE_DEBOUNCE_MS = 400;

export function IdeasProvider({ children }: { children: React.ReactNode }) {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveStates, setSaveStates] = useState<Record<string, SaveState>>({});

  const pendingPatches = useRef<Record<string, IdeaPatch>>({});
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const savedFlashTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    let cancelled = false;
    fetch("/api/ideas")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load ideas");
        return res.json();
      })
      .then((data: Idea[]) => {
        if (!cancelled) {
          setIdeas(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message ?? "Failed to load ideas");
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const flush = useCallback((id: string, keepalive = false) => {
    const patch = pendingPatches.current[id];
    if (!patch) return;
    delete pendingPatches.current[id];
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }

    setSaveStates((prev) => ({ ...prev, [id]: "pending" }));

    fetch(`/api/ideas/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
      keepalive,
    })
      .then((res) => {
        if (!res.ok) throw new Error("save failed");
        setSaveStates((prev) => ({ ...prev, [id]: "saved" }));
        if (savedFlashTimers.current[id]) clearTimeout(savedFlashTimers.current[id]);
        savedFlashTimers.current[id] = setTimeout(() => {
          setSaveStates((prev) => ({ ...prev, [id]: "idle" }));
        }, 1200);
      })
      .catch(() => {
        setSaveStates((prev) => ({ ...prev, [id]: "error" }));
      });
  }, []);

  const flushAll = useCallback(
    (keepalive = false) => {
      Object.keys(pendingPatches.current).forEach((id) => flush(id, keepalive));
    },
    [flush],
  );

  useEffect(() => {
    const handleHide = () => flushAll(true);
    window.addEventListener("beforeunload", handleHide);
    window.addEventListener("pagehide", handleHide);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) flushAll(true);
    });
    return () => {
      window.removeEventListener("beforeunload", handleHide);
      window.removeEventListener("pagehide", handleHide);
    };
  }, [flushAll]);

  const updateIdea = useCallback(
    (id: string, patch: IdeaFieldPatch) => {
      setIdeas((prev) =>
        prev.map((idea) => {
          if (idea.id !== id) return idea;
          const { metrics: metricsPatch, ...rest } = patch;
          const next: Idea = { ...idea, ...rest };
          if (metricsPatch) {
            next.metrics = { ...idea.metrics, ...metricsPatch };
          }
          return next;
        }),
      );

      const flat = flattenPatch(patch);
      pendingPatches.current[id] = { ...pendingPatches.current[id], ...flat };

      if (timers.current[id]) clearTimeout(timers.current[id]);
      timers.current[id] = setTimeout(() => flush(id), SAVE_DEBOUNCE_MS);
    },
    [flush],
  );

  const createIdea = useCallback(async () => {
    const res = await fetch("/api/ideas", { method: "POST" });
    if (!res.ok) return;
    const created: Idea = await res.json();
    setIdeas((prev) => [created, ...prev]);
  }, []);

  const deleteIdea = useCallback(async (id: string) => {
    setIdeas((prev) => prev.filter((idea) => idea.id !== id));
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
    delete pendingPatches.current[id];
    await fetch(`/api/ideas/${id}`, { method: "DELETE" });
  }, []);

  return (
    <IdeasContext.Provider
      value={{ ideas, loading, error, saveStates, updateIdea, createIdea, deleteIdea }}
    >
      {children}
    </IdeasContext.Provider>
  );
}

export function useIdeas() {
  const ctx = useContext(IdeasContext);
  if (!ctx) throw new Error("useIdeas must be used within an IdeasProvider");
  return ctx;
}
