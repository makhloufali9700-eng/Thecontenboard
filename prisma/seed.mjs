import { PrismaClient } from "@prisma/client";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const prisma = new PrismaClient();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const raw = JSON.parse(readFileSync(path.join(__dirname, "seed-data.json"), "utf-8"));

async function main() {
  await prisma.idea.deleteMany();

  for (let i = 0; i < raw.length; i++) {
    const item = raw[i];
    const metrics = item.metrics ?? {};
    await prisma.idea.create({
      data: {
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
        metricViews: metrics.views ?? "",
        metricComments: metrics.comments ?? "",
        metricShares: metrics.shares ?? "",
        metricSaves: metrics.saves ?? "",
        metricFollowers: metrics.followers ?? "",
        perfNotes: item.perfNotes ?? "",
      },
    });
  }

  console.log(`Seeded ${raw.length} ideas.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
