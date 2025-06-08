import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const rows = db
    .prepare(
      "SELECT name, score, created_at FROM leaderboard ORDER BY score DESC LIMIT 10"
    )
    .all();
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, score } = body;

  if (!name || typeof score !== "number") {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  db.prepare("INSERT INTO leaderboard (name, score) VALUES (?, ?)").run(
    name,
    score
  );
  return NextResponse.json({ success: true });
}
