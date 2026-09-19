"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIdeas } from "@/context/IdeasContext";

const LINKS = [
  { href: "/", label: "Board" },
  { href: "/performance", label: "Performance" },
  { href: "/analytics", label: "Analytics" },
];

export function Nav() {
  const pathname = usePathname();
  const { ideas } = useIdeas();

  function handleExport() {
    const blob = new Blob([JSON.stringify(ideas, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const stamp = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `bridge-content-board-export-${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-paper-line bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/80">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-lg font-semibold tracking-tight text-ink sm:text-xl">
            The Bridge
          </span>
          <span className="hidden text-sm text-ink-faint sm:inline">Content Board</span>
        </div>

        <nav className="flex items-center gap-1 rounded-full border border-paper-line bg-paper-raised p-1 text-sm">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1.5 font-medium transition-colors ${
                  active
                    ? "bg-ink text-paper"
                    : "text-ink-soft hover:bg-paper-line/60"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleExport}
          className="rounded-full border border-paper-line bg-paper-raised px-3 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:border-accent hover:text-accent"
        >
          Export
        </button>
      </div>
    </header>
  );
}
