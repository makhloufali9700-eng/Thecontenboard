"use client";

export interface ColorOption {
  value: string;
  label: string;
  bg: string;
  text: string;
}

interface ColorSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: ColorOption[];
  ariaLabel?: string;
  className?: string;
}

export function ColorSelect({ value, onChange, options, ariaLabel, className }: ColorSelectProps) {
  const current = options.find((o) => o.value === value) ?? options[0];

  return (
    <select
      aria-label={ariaLabel}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`cursor-pointer rounded-full border px-2.5 py-1 text-xs font-medium outline-none transition focus:ring-2 focus:ring-accent/40 ${className ?? ""}`}
      style={{
        backgroundColor: current?.bg,
        color: current?.text,
        borderColor: "transparent",
      }}
    >
      {options.map((o) => (
        <option key={o.value || "empty"} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
