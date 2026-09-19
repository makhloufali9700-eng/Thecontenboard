"use client";

import type { Idea } from "@/lib/types";
import type { IdeaFieldPatch, SaveState } from "@/context/IdeasContext";
import { TypeSelect, TriggerSelect, StatusSelect, FormatSelect } from "@/components/fields/FieldSelects";
import { SaveIndicator } from "@/components/SaveIndicator";

interface IdeaTableProps {
  ideas: Idea[];
  saveStates: Record<string, SaveState>;
  onChange: (id: string, patch: IdeaFieldPatch) => void;
  onDelete: (id: string) => void;
}

const cellText =
  "w-full resize-none bg-transparent px-2 py-1.5 text-sm text-ink outline-none placeholder:text-ink-faint rounded-md focus:bg-paper";

export function IdeaTable({ ideas, saveStates, onChange, onDelete }: IdeaTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-paper-line bg-paper-raised">
      <table className="w-full min-w-[1100px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-paper-line text-left text-xs font-medium uppercase tracking-wide text-ink-faint">
            <th className="px-2 py-2 w-[220px]">Title</th>
            <th className="px-2 py-2 w-[120px]">Type</th>
            <th className="px-2 py-2 w-[130px]">Trigger</th>
            <th className="px-2 py-2 w-[140px]">Status</th>
            <th className="px-2 py-2 w-[150px]">Format</th>
            <th className="px-2 py-2 w-[220px]">Summary</th>
            <th className="px-2 py-2 w-[220px]">Script</th>
            <th className="px-2 py-2 w-[70px]"></th>
          </tr>
        </thead>
        <tbody>
          {ideas.map((idea) => (
            <tr key={idea.id} className="border-b border-paper-line/70 align-top last:border-b-0">
              <td className="px-2 py-2">
                <input
                  dir="auto"
                  value={idea.title}
                  onChange={(e) => onChange(idea.id, { title: e.target.value })}
                  placeholder="Idea title…"
                  className="rtl-field w-full rounded-md bg-transparent px-1 py-1 font-medium text-ink outline-none placeholder:text-ink-faint focus:bg-paper"
                />
                <div className="px-1 pt-1">
                  <SaveIndicator state={saveStates[idea.id]} />
                </div>
              </td>
              <td className="px-2 py-2">
                <TypeSelect value={idea.type} onChange={(v) => onChange(idea.id, { type: v as Idea["type"] })} />
              </td>
              <td className="px-2 py-2">
                <TriggerSelect
                  value={idea.trigger}
                  onChange={(v) => onChange(idea.id, { trigger: v as Idea["trigger"] })}
                />
              </td>
              <td className="px-2 py-2">
                <StatusSelect
                  value={idea.status}
                  onChange={(v) => onChange(idea.id, { status: v as Idea["status"] })}
                />
              </td>
              <td className="px-2 py-2">
                <FormatSelect value={idea.format} onChange={(v) => onChange(idea.id, { format: v })} />
              </td>
              <td className="px-2 py-2">
                <textarea
                  dir="auto"
                  rows={2}
                  value={idea.summary}
                  onChange={(e) => onChange(idea.id, { summary: e.target.value })}
                  placeholder="Summary…"
                  className={`rtl-field ${cellText}`}
                />
              </td>
              <td className="px-2 py-2">
                <textarea
                  dir="auto"
                  rows={2}
                  value={idea.script}
                  onChange={(e) => onChange(idea.id, { script: e.target.value })}
                  placeholder="Script…"
                  className={`rtl-field ${cellText}`}
                />
              </td>
              <td className="px-2 py-2 text-right">
                <button
                  type="button"
                  onClick={() => onDelete(idea.id)}
                  aria-label="Delete idea"
                  className="rounded-md p-1 text-ink-faint transition hover:bg-red-50 hover:text-red-600"
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
