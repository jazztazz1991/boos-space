import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { CreateEntrySchema, DeleteEntrySchema, GetEntriesSchema } from "@/domain/entry";
import { deleteEntry, getEntriesForMonth, upsertEntry } from "@/domain/entry.service";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const parsed = GetEntriesSchema.safeParse({
    month: searchParams.get("month"),
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid month format. Use YYYY-MM" },
      { status: 400 }
    );
  }

  const [year, month] = parsed.data.month.split("-").map(Number);
  const entries = await getEntriesForMonth(session.user.id, year, month);

  return NextResponse.json({ entries });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = CreateEntrySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.issues },
      { status: 400 }
    );
  }

  const entry = await upsertEntry(session.user.id, parsed.data);

  return NextResponse.json({ entry });
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = DeleteEntrySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.issues },
      { status: 400 }
    );
  }

  const deleted = await deleteEntry(session.user.id, parsed.data.date);

  if (!deleted) {
    return NextResponse.json({ error: "Entry not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
