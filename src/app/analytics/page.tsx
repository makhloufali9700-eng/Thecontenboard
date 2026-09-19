"use client";

import { useMemo, useState } from "react";
import { useIdeas } from "@/context/IdeasContext";
import {
  IDEA_TYPES,
  STATUSES,
  STATUS_COLORS,
  STATUS_LABELS,
  TRIGGERS,
  TRIGGER_COLORS,
  TYPE_COLORS,
} from "@/lib/constants";
import { FilterBar, matchesFilters, type Filters } from "@/components/FilterBar";
import { BarBreakdown } from "@/components/analytics/BarBreakdown";

const DEFAULT_FILTERS: Filters = { type: "all", trigger: "all", status: "all" };
const NON_PARKED_STATUSES = STATUSES.filter((s) => s !== "Parked");

export default function AnalyticsPage() {
  const { ideas, loading, error } = useIdeas();
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  // Parked ideas are excluded from Analytics entirely: never counted, never
  // offered as a filter target, and never shown as a status bar.
  const eligibleIdeas = useMemo(() => ideas.filter((idea) => idea.status !== "Parked"), [ideas]);

  const filteredIdeas = useMemo(
    () => eligibleIdeas.filter((idea) => matchesFilters(idea, filters)),
    [eligibleIdeas, filters],
  );

  const byType = IDEA_TYPES.map((type) => ({
    label: type,
    count: filteredIdeas.filter((i) => i.type === type).length,
    color: TYPE_COLORS[type].dot,
  }));

  const byTrigger = TRIGGERS.map((trigger) => ({
    label: trigger,
    count: filteredIdeas.filter((i) => i.trigger === trigger).length,
    color: TRIGGER_COLORS[trigger].dot,
  }));

  const byStatus = NON_PARKED_STATUSES.map((status) => ({
    label: STATUS_LABELS[status],
    count: filteredIdeas.filter((i) => i.status === status).length,
    color: STATUS_COLORS[status].dot,
  }));

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6">
      <div className="mb-5">
        <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Analytics</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Pipeline breakdown — Parked ideas are excluded so they never skew the numbers.
        </p>
      </div>

      <div className="mb-5">
        <FilterBar filters={filters} onChange={setFilters} statusOptions={NON_PARKED_STATUSES} />
      </div>

      {loading && <p className="text-sm text-ink-faint">Loading ideas…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          <div className="mb-5 rounded-xl border border-paper-line bg-paper-raised p-4">
            <span className="text-xs font-medium uppercase tracking-wide text-ink-faint">
              Total ideas matching filters
            </span>
            <p className="font-display text-3xl font-semibold text-ink">{filteredIdeas.length}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <BarBreakdown title="By Type" items={byType} />
            <BarBreakdown title="By Trigger" items={byTrigger} />
            <BarBreakdown title="By Status" items={byStatus} />
          </div>
        </>
      )}
    </div>
  );
}
