export const IDEA_TYPES = ["Expert", "Engaging", "Personal", "Selling"] as const;
export type IdeaType = (typeof IDEA_TYPES)[number];

export const TRIGGERS = ["Pain", "Curiosity", "Relatability", "Desire"] as const;
export type Trigger = (typeof TRIGGERS)[number];

export const STATUSES = [
  "White",
  "Blue",
  "Yellow",
  "Red",
  "Green",
  "Posted",
  "Parked",
] as const;
export type Status = (typeof STATUSES)[number];

export const STATUS_LABELS: Record<Status, string> = {
  White: "Idea Only",
  Blue: "Draft",
  Yellow: "Final Review",
  Red: "Ready to Shoot",
  Green: "Shot",
  Posted: "Posted",
  Parked: "Parked",
};

export const FORMATS = ["Talking Head", "Explanation", "Cutout", "Duet"] as const;
export type Format = (typeof FORMATS)[number];

export const POST_STATUSES = ["Posted on Profile", "Trial"] as const;

// Statuses that belong on the Performance view instead of the Board.
export const PERFORMANCE_STATUSES: Status[] = ["Green", "Posted"];

export const TYPE_COLORS: Record<IdeaType, { bg: string; text: string; dot: string }> = {
  Expert: { bg: "#dcf1ee", text: "#0d6d63", dot: "#0d9488" }, // teal
  Engaging: { bg: "#fde3d3", text: "#b8481f", dot: "#f2703c" }, // coral / orange
  Personal: { bg: "#f7e6bf", text: "#8a5c07", dot: "#c8850f" }, // gold / amber
  Selling: { bg: "#ecdbfb", text: "#6b21a8", dot: "#9333ea" }, // purple
};

export const TRIGGER_COLORS: Record<Trigger, { bg: string; text: string; dot: string }> = {
  Pain: { bg: "#fbdde2", text: "#9f1239", dot: "#e11d48" }, // rose
  Curiosity: { bg: "#d9edfa", text: "#075985", dot: "#0284c7" }, // sky blue
  Relatability: { bg: "#d7f0e3", text: "#065f46", dot: "#059669" }, // emerald
  Desire: { bg: "#fbdcec", text: "#9d174d", dot: "#db2777" }, // magenta / pink
};

export const FORMAT_COLORS: Record<Format, { bg: string; text: string; dot: string }> = {
  "Talking Head": { bg: "#e4e1f5", text: "#4338ca", dot: "#6366f1" },
  Explanation: { bg: "#dde7f3", text: "#1d4ed8", dot: "#3b82f6" },
  Cutout: { bg: "#e7ded2", text: "#78350f", dot: "#a16207" },
  Duet: { bg: "#dceef0", text: "#0e6b76", dot: "#0891b2" },
};

export const STATUS_COLORS: Record<Status, { bg: string; text: string; dot: string }> = {
  White: { bg: "#efe9db", text: "#5c5140", dot: "#c9bea3" },
  Blue: { bg: "#dbe7fb", text: "#1e40af", dot: "#2563eb" },
  Yellow: { bg: "#fbedc3", text: "#8a5a08", dot: "#eab308" },
  Red: { bg: "#f9dcdb", text: "#991b1b", dot: "#dc2626" },
  Green: { bg: "#dcf0e1", text: "#166534", dot: "#16a34a" },
  Posted: { bg: "#e2e1fa", text: "#3730a3", dot: "#4f46e5" },
  Parked: { bg: "#e7e4de", text: "#57534e", dot: "#9c9488" },
};
