"use client";

import { useMemo } from "react";
import { useIdeas } from "@/context/IdeasContext";
import { PERFORMANCE_STATUSES } from "@/lib/constants";
import { PerformanceCard } from "@/components/performance/PerformanceCard";

export default function PerformancePage() {
  const { ideas, loading, error, saveStates, updateIdea } = useIdeas();

  const performanceIdeas = useMemo(
    () => ideas.filter((idea) => PERFORMANCE_STATUSES.includes(idea.status)),
    [ideas],
  );

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6">
      <div className="mb-5">
        <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Performance</h1>
        <p className="mt-1 text-sm text-ink-soft">
          {performanceIdeas.length} shot or posted reel{performanceIdeas.length === 1 ? "" : "s"} —
          compare each script against how it performed.
        </p>
      </div>

      {loading && <p className="text-sm text-ink-faint">Loading ideas…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {!loading && !error && performanceIdeas.length === 0 && (
        <p className="rounded-xl border border-dashed border-paper-line bg-paper-raised/60 px-4 py-10 text-center text-sm text-ink-faint">
          Nothing shot or posted yet. Move an idea to Shot on the Board to see it here.
        </p>
      )}

      {!loading && !error && performanceIdeas.length > 0 && (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {performanceIdeas.map((idea) => (
            <PerformanceCard
              key={idea.id}
              idea={idea}
              saveState={saveStates[idea.id]}
              onChange={(patch) => updateIdea(idea.id, patch)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
