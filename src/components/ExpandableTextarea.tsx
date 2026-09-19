"use client";

import { useState } from "react";

interface ExpandableTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  defaultExpanded?: boolean;
}

export function ExpandableTextarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 6,
  defaultExpanded = false,
}: ExpandableTextareaProps) {
  const [expanded, setExpanded] = useState(defaultExpanded || value.length > 0);

  return (
    <div className="overflow-hidden rounded-lg border border-paper-line bg-paper-raised/70">
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="flex w-full items-center justify-between px-3 py-1.5 text-xs font-medium text-ink-soft hover:bg-paper-line/40"
      >
        <span>{label}</span>
        <span className="text-ink-faint">{expanded ? "Collapse ▲" : value ? "Expand ▼" : "Add ▾"}</span>
      </button>
      {expanded && (
        <textarea
          dir="auto"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="rtl-field w-full resize-y border-t border-paper-line bg-transparent px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-faint"
        />
      )}
      {!expanded && value && (
        <p dir="auto" className="rtl-field line-clamp-2 px-3 pb-2 text-sm text-ink-soft">
          {value}
        </p>
      )}
    </div>
  );
}
