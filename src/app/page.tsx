"use client";

import { useMemo, useState } from "react";
import { useIdeas } from "@/context/IdeasContext";
import { PERFORMANCE_STATUSES } from "@/lib/constants";
import { FilterBar, matchesFilters, type Filters } from "@/components/FilterBar";
import { IdeaCard } from "@/components/board/IdeaCard";
import { IdeaTable } from "@/components/board/IdeaTable";

type ViewMode = "cards" | "list";

const DEFAULT_FILTERS: Filters = { type: "all", trigger: "all", status: "all" };

export default function BoardPage() {
  const { ideas, loading, error, saveStates, updateIdea, createIdea, deleteIdea } = useIdeas();
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const boardIdeas = useMemo(
    () => ideas.filter((idea) => !PERFORMANCE_STATUSES.includes(idea.status)),
    [ideas],
  );

  const visibleIdeas = useMemo(
    () => boardIdeas.filter((idea) => matchesFilters(idea, filters)),
    [boardIdeas, filters],
  );

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Board</h1>
          <p className="mt-1 text-sm text-ink-soft">
            {boardIdeas.length} idea{boardIdeas.length === 1 ? "" : "s"} in the pipeline
            {visibleIdeas.length !== boardIdeas.length ? ` · ${visibleIdeas.length} shown` : ""}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-full border border-paper-line bg-paper-raised p-1 text-sm">
            <button
              type="button"
              onClick={() => setViewMode("cards")}
              className={`rounded-full px-3 py-1.5 font-medium transition ${
                viewMode === "cards" ? "bg-ink text-paper" : "text-ink-soft hover:bg-paper-line/60"
              }`}
            >
              Cards
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`rounded-full px-3 py-1.5 font-medium transition ${
                viewMode === "list" ? "bg-ink text-paper" : "text-ink-soft hover:bg-paper-line/60"
              }`}
            >
              List
            </button>
          </div>

          <button
            type="button"
            onClick={() => createIdea()}
            className="rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-paper shadow-sm transition hover:brightness-110"
          >
            + New Idea
          </button>
        </div>
      </div>

      <div className="mb-5">
        <FilterBar filters={filters} onChange={setFilters} />
      </div>

      {loading && <p className="text-sm text-ink-faint">Loading ideas…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {!loading && !error && visibleIdeas.length === 0 && (
        <p className="rounded-xl border border-dashed border-paper-line bg-paper-raised/60 px-4 py-10 text-center text-sm text-ink-faint">
          No ideas match these filters.
        </p>
      )}

      {!loading && !error && visibleIdeas.length > 0 && viewMode === "cards" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visibleIdeas.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              saveState={saveStates[idea.id]}
              onChange={(patch) => updateIdea(idea.id, patch)}
              onDelete={() => {
                if (window.confirm(`Delete "${idea.title || "this idea"}"? This can't be undone.`)) {
                  deleteIdea(idea.id);
                }
              }}
            />
          ))}
        </div>
      )}

      {!loading && !error && visibleIdeas.length > 0 && viewMode === "list" && (
        <IdeaTable
          ideas={visibleIdeas}
          saveStates={saveStates}
          onChange={(id, patch) => updateIdea(id, patch)}
          onDelete={(id) => {
            const idea = ideas.find((i) => i.id === id);
            if (window.confirm(`Delete "${idea?.title || "this idea"}"? This can't be undone.`)) {
              deleteIdea(id);
            }
          }}
        />
      )}
    </div>
  );
}
