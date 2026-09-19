export interface BarItem {
  label: string;
  count: number;
  color: string;
}

interface BarBreakdownProps {
  title: string;
  items: BarItem[];
}

export function BarBreakdown({ title, items }: BarBreakdownProps) {
  const max = Math.max(1, ...items.map((i) => i.count));

  return (
    <div className="rounded-xl border border-paper-line bg-paper-raised p-4">
      <h3 className="mb-3 font-display text-base font-semibold text-ink">{title}</h3>
      <div className="space-y-2.5">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="w-28 shrink-0 truncate text-xs text-ink-soft">{item.label}</span>
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-paper-line/60">
              <div
                className="h-full rounded-full transition-[width]"
                style={{ width: `${(item.count / max) * 100}%`, backgroundColor: item.color }}
              />
            </div>
            <span className="w-6 shrink-0 text-right text-xs font-semibold text-ink">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
