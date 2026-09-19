import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serializeIdea } from "@/lib/types";
import { ensureSeeded } from "@/lib/ensureSeeded";

export async function GET() {
  await ensureSeeded();
  const rows = await prisma.idea.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(rows.map(serializeIdea));
}

export async function POST(req: NextRequest) {
  await ensureSeeded();
  const body = await req.json().catch(() => ({}));

  const lowest = await prisma.idea.aggregate({ _min: { order: true } });
  const order = (lowest._min.order ?? 0) - 1;

  const row = await prisma.idea.create({
    data: {
      order,
      title: typeof body.title === "string" ? body.title : "",
      type: "Expert",
      trigger: "Pain",
      status: "White",
    },
  });

  return NextResponse.json(serializeIdea(row), { status: 201 });
}
