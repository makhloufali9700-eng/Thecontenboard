"use client";

import { ColorSelect } from "./ColorSelect";
import {
  FORMATS,
  FORMAT_COLORS,
  IDEA_TYPES,
  POST_STATUSES,
  STATUSES,
  STATUS_COLORS,
  STATUS_LABELS,
  TRIGGERS,
  TRIGGER_COLORS,
  TYPE_COLORS,
} from "@/lib/constants";

interface FieldProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function TypeSelect({ value, onChange, className }: FieldProps) {
  return (
    <ColorSelect
      ariaLabel="Type"
      value={value}
      onChange={onChange}
      className={className}
      options={IDEA_TYPES.map((t) => ({
        value: t,
        label: t,
        bg: TYPE_COLORS[t].bg,
        text: TYPE_COLORS[t].text,
      }))}
    />
  );
}

export function TriggerSelect({ value, onChange, className }: FieldProps) {
  return (
    <ColorSelect
      ariaLabel="Trigger"
      value={value}
      onChange={onChange}
      className={className}
      options={TRIGGERS.map((t) => ({
        value: t,
        label: t,
        bg: TRIGGER_COLORS[t].bg,
        text: TRIGGER_COLORS[t].text,
      }))}
    />
  );
}

export function StatusSelect({ value, onChange, className }: FieldProps) {
  return (
    <ColorSelect
      ariaLabel="Status"
      value={value}
      onChange={onChange}
      className={className}
      options={STATUSES.map((s) => ({
        value: s,
        label: STATUS_LABELS[s],
        bg: STATUS_COLORS[s].bg,
        text: STATUS_COLORS[s].text,
      }))}
    />
  );
}

export function FormatSelect({ value, onChange, className }: FieldProps) {
  const emptyOption = { value: "", label: "Format — not set", bg: "#e9e4d8", text: "#8b8271" };
  return (
    <ColorSelect
      ariaLabel="Format"
      value={value}
      onChange={onChange}
      className={className}
      options={[
        emptyOption,
        ...FORMATS.map((f) => ({
          value: f,
          label: f,
          bg: FORMAT_COLORS[f].bg,
          text: FORMAT_COLORS[f].text,
        })),
      ]}
    />
  );
}

export function PostStatusSelect({ value, onChange, className }: FieldProps) {
  const emptyOption = { value: "", label: "No post status", bg: "#e9e4d8", text: "#8b8271" };
  return (
    <ColorSelect
      ariaLabel="Post status"
      value={value}
      onChange={onChange}
      className={className}
      options={[
        emptyOption,
        ...POST_STATUSES.map((p) => ({
          value: p,
          label: p,
          bg: "#e2e1fa",
          text: "#3730a3",
        })),
      ]}
    />
  );
}
