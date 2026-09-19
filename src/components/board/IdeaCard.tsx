"use client";

import type { Idea } from "@/lib/types";
import type { IdeaFieldPatch, SaveState } from "@/context/IdeasContext";
import { TypeSelect, TriggerSelect, StatusSelect, FormatSelect } from "@/components/fields/FieldSelects";
import { ExpandableTextarea } from "@/components/ExpandableTextarea";
import { SaveIndicator } from "@/components/SaveIndicator";

interface IdeaCardProps {
  idea: Idea;
  saveState: SaveState | undefined;
  onChange: (patch: IdeaFieldPatch) => void;
  onDelete: () => void;
}

export function IdeaCard({ idea, saveState, onChange, onDelete }: IdeaCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-paper-line bg-paper-raised p-4 shadow-sm shadow-black/[0.03]">
      <div className="flex items-start gap-2">
        <input
          dir="auto"
          value={idea.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Idea title…"
          className="rtl-field w-full flex-1 bg-transparent text-base font-semibold text-ink outline-none placeholder:text-ink-faint"
        />
        <button
          type="button"
          onClick={onDelete}
          aria-label="Delete idea"
          className="shrink-0 rounded-md p-1 text-ink-faint transition hover:bg-red-50 hover:text-red-600"
        >
          ✕
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <TypeSelect value={idea.type} onChange={(v) => onChange({ type: v as Idea["type"] })} />
        <TriggerSelect value={idea.trigger} onChange={(v) => onChange({ trigger: v as Idea["trigger"] })} />
        <StatusSelect value={idea.status} onChange={(v) => onChange({ status: v as Idea["status"] })} />
        <FormatSelect value={idea.format} onChange={(v) => onChange({ format: v })} />
      </div>

      <ExpandableTextarea
        label="Summary"
        value={idea.summary}
        onChange={(v) => onChange({ summary: v })}
        placeholder="Short 1–2 line description…"
        rows={3}
      />

      <ExpandableTextarea
        label="Script"
        value={idea.script}
        onChange={(v) => onChange({ script: v })}
        placeholder="Full written script…"
        rows={8}
      />

      <div className="flex h-4 items-center justify-end">
        <SaveIndicator state={saveState} />
      </div>
    </div>
  );
}
