"use client";

import type { Idea, Metrics } from "@/lib/types";
import type { IdeaFieldPatch, SaveState } from "@/context/IdeasContext";
import { Tag } from "@/components/Tag";
import { ColorSelect } from "@/components/fields/ColorSelect";
import { PostStatusSelect } from "@/components/fields/FieldSelects";
import { SaveIndicator } from "@/components/SaveIndicator";
import { STATUS_COLORS, STATUS_LABELS, TRIGGER_COLORS, TYPE_COLORS } from "@/lib/constants";

interface PerformanceCardProps {
  idea: Idea;
  saveState: SaveState | undefined;
  onChange: (patch: IdeaFieldPatch) => void;
}

const METRIC_FIELDS: { key: keyof Metrics; label: string }[] = [
  { key: "views", label: "Views" },
  { key: "comments", label: "Comments" },
  { key: "shares", label: "Shares" },
  { key: "saves", label: "Saves" },
  { key: "followers", label: "New Followers" },
];

export function PerformanceCard({ idea, saveState, onChange }: PerformanceCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-paper-line bg-paper-raised p-4 shadow-sm shadow-black/[0.03]">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 dir="auto" className="rtl-field flex-1 text-base font-semibold text-ink">
          {idea.title || <span className="text-ink-faint">Untitled idea</span>}
        </h3>
        <SaveIndicator state={saveState} />
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <Tag label={idea.type} bg={TYPE_COLORS[idea.type].bg} text={TYPE_COLORS[idea.type].text} />
        <Tag label={idea.trigger} bg={TRIGGER_COLORS[idea.trigger].bg} text={TRIGGER_COLORS[idea.trigger].text} />

        <ColorSelect
          ariaLabel="Status"
          value={idea.status}
          onChange={(v) => onChange({ status: v as Idea["status"] })}
          options={["Green", "Posted"].map((s) => ({
            value: s,
            label: STATUS_LABELS[s as "Green" | "Posted"],
            bg: STATUS_COLORS[s as "Green" | "Posted"].bg,
            text: STATUS_COLORS[s as "Green" | "Posted"].text,
          }))}
        />

        <PostStatusSelect value={idea.postStatus} onChange={(v) => onChange({ postStatus: v })} />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-faint">
          Script
        </label>
        <textarea
          dir="auto"
          value={idea.script}
          onChange={(e) => onChange({ script: e.target.value })}
          placeholder="Full written script…"
          rows={8}
          className="rtl-field w-full resize-y rounded-lg border border-paper-line bg-paper px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-faint focus:ring-2 focus:ring-accent/30"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-faint">
          Metrics
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {METRIC_FIELDS.map((field) => (
            <div key={field.key}>
              <span className="mb-1 block text-[11px] text-ink-faint">{field.label}</span>
              <input
                inputMode="numeric"
                value={idea.metrics[field.key]}
                onChange={(e) => onChange({ metrics: { [field.key]: e.target.value } })}
                placeholder="0"
                className="w-full rounded-md border border-paper-line bg-paper px-2 py-1.5 text-sm text-ink outline-none focus:ring-2 focus:ring-accent/30"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-faint">
          Notes / Insights
        </label>
        <textarea
          dir="auto"
          value={idea.perfNotes}
          onChange={(e) => onChange({ perfNotes: e.target.value })}
          placeholder="What worked, what didn't…"
          rows={3}
          className="rtl-field w-full resize-y rounded-lg border border-paper-line bg-paper px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-faint focus:ring-2 focus:ring-accent/30"
        />
      </div>
    </div>
  );
}
