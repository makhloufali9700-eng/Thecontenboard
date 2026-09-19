"use client";

import { IDEA_TYPES, STATUSES, STATUS_LABELS, TRIGGERS, type Status } from "@/lib/constants";

export interface Filters {
  type: string;
  trigger: string;
  status: string;
}

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  statusOptions?: readonly Status[];
}

const baseSelect =
  "rounded-lg border border-paper-line bg-paper-raised px-2.5 py-1.5 text-sm text-ink-soft outline-none transition focus:ring-2 focus:ring-accent/30";

export function FilterBar({ filters, onChange, statusOptions = STATUSES }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        aria-label="Filter by type"
        className={baseSelect}
        value={filters.type}
        onChange={(e) => onChange({ ...filters, type: e.target.value })}
      >
        <option value="all">All types</option>
        {IDEA_TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <select
        aria-label="Filter by trigger"
        className={baseSelect}
        value={filters.trigger}
        onChange={(e) => onChange({ ...filters, trigger: e.target.value })}
      >
        <option value="all">All triggers</option>
        {TRIGGERS.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <select
        aria-label="Filter by status"
        className={baseSelect}
        value={filters.status}
        onChange={(e) => onChange({ ...filters, status: e.target.value })}
      >
        <option value="all">All statuses</option>
        {statusOptions.map((s) => (
          <option key={s} value={s}>
            {STATUS_LABELS[s]}
          </option>
        ))}
      </select>
    </div>
  );
}

export function matchesFilters(
  item: { type: string; trigger: string; status: string },
  filters: Filters,
) {
  if (filters.type !== "all" && item.type !== filters.type) return false;
  if (filters.trigger !== "all" && item.trigger !== filters.trigger) return false;
  if (filters.status !== "all" && item.status !== filters.status) return false;
  return true;
}
