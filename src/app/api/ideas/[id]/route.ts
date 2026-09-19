import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ALLOWED_PATCH_FIELDS, serializeIdea, type IdeaPatch } from "@/lib/types";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const body = await req.json().catch(() => ({}));

  const data: IdeaPatch = {};
  for (const key of ALLOWED_PATCH_FIELDS) {
    if (key in body) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (data as any)[key] = body[key];
    }
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  try {
    const row = await prisma.idea.update({ where: { id }, data });
    return NextResponse.json(serializeIdea(row));
  } catch {
    return NextResponse.json({ error: "Idea not found" }, { status: 404 });
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  try {
    await prisma.idea.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Idea not found" }, { status: 404 });
  }
}
