import { prisma } from "./prisma";
import seedData from "../../prisma/seed-data.json";

interface SeedMetrics {
  views?: string;
  comments?: string;
  shares?: string;
  saves?: string;
  followers?: string;
}

interface SeedIdea {
  id: string;
  title?: string;
  type?: string;
  trigger?: string;
  status?: string;
  format?: string;
  summary?: string;
  script?: string;
  postStatus?: string;
  metrics?: SeedMetrics;
  perfNotes?: string;
}

// A freshly provisioned production database starts empty. Rather than
// requiring shell/terminal access to run a seed script, the first request
// against an empty table populates it with the original 28 ideas.
let seeded = false;

export async function ensureSeeded() {
  if (seeded) return;

  const count = await prisma.idea.count();
  if (count === 0) {
    const rows = seedData as SeedIdea[];
    await prisma.idea.createMany({
      data: rows.map((item, i) => ({
        id: item.id,
        order: i + 1,
        title: item.title ?? "",
        type: item.type ?? "Expert",
        trigger: item.trigger ?? "Pain",
        status: item.status ?? "White",
        format: item.format ?? "",
        summary: item.summary ?? "",
        script: item.script ?? "",
        postStatus: item.postStatus ?? "",
        metricViews: item.metrics?.views ?? "",
        metricComments: item.metrics?.comments ?? "",
        metricShares: item.metrics?.shares ?? "",
        metricSaves: item.metrics?.saves ?? "",
        metricFollowers: item.metrics?.followers ?? "",
        perfNotes: item.perfNotes ?? "",
      })),
    });
  }

  seeded = true;
}
