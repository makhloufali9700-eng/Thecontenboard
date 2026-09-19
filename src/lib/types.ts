import type { Idea as DbIdea } from "@prisma/client";
import type { IdeaType, Trigger, Status } from "./constants";

export interface Metrics {
  views: string;
  comments: string;
  shares: string;
  saves: string;
  followers: string;
}

export interface Idea {
  id: string;
  order: number;
  title: string;
  type: IdeaType;
  trigger: Trigger;
  status: Status;
  format: string;
  summary: string;
  script: string;
  postStatus: string;
  metrics: Metrics;
  perfNotes: string;
  createdAt: string;
  updatedAt: string;
}

// Flat, database-shaped patch used by the API — mirrors Prisma columns directly
// so a partial edit can be persisted without re-shaping nested objects.
export type IdeaPatch = Partial<{
  title: string;
  type: string;
  trigger: string;
  status: string;
  format: string;
  summary: string;
  script: string;
  postStatus: string;
  metricViews: string;
  metricComments: string;
  metricShares: string;
  metricSaves: string;
  metricFollowers: string;
  perfNotes: string;
  order: number;
}>;

export function serializeIdea(row: DbIdea): Idea {
  return {
    id: row.id,
    order: row.order,
    title: row.title,
    type: row.type as IdeaType,
    trigger: row.trigger as Trigger,
    status: row.status as Status,
    format: row.format,
    summary: row.summary,
    script: row.script,
    postStatus: row.postStatus,
    metrics: {
      views: row.metricViews,
      comments: row.metricComments,
      shares: row.metricShares,
      saves: row.metricSaves,
      followers: row.metricFollowers,
    },
    perfNotes: row.perfNotes,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export const ALLOWED_PATCH_FIELDS: (keyof IdeaPatch)[] = [
  "title",
  "type",
  "trigger",
  "status",
  "format",
  "summary",
  "script",
  "postStatus",
  "metricViews",
  "metricComments",
  "metricShares",
  "metricSaves",
  "metricFollowers",
  "perfNotes",
  "order",
];
