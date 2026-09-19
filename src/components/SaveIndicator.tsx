"use client";

import type { SaveState } from "@/context/IdeasContext";

export function SaveIndicator({ state }: { state: SaveState | undefined }) {
  if (!state || state === "idle") return null;

  const label = state === "pending" ? "Saving" : state === "saved" ? "Saved" : "Save failed";
  const color = state === "error" ? "#dc2626" : state === "saved" ? "#16a34a" : "#8b8271";

  return (
    <span
      className="inline-flex items-center gap-1 text-[11px] font-medium transition-opacity"
      style={{ color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}
