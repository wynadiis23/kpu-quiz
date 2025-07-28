import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  // const rows = db
  //   .prepare(
  //     "SELECT name, score, created_at FROM leaderboard ORDER BY score DESC LIMIT 10"
  //   )
  //   .all();
  const { data: leaderboard, error } = await supabase
    .from("leaderboard")
    .select("*")
    .order("score", {
      ascending: false,
    })
    .limit(10);
  console.log(leaderboard, error);
  return NextResponse.json(leaderboard);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, score } = body;

  if (!name || typeof score !== "number") {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  // db.prepare("INSERT INTO leaderboard (name, score) VALUES (?, ?)").run(
  //   name,
  //   score
  // );
  const result = await supabase.from("leaderboard").insert([
    {
      name: name,
      score: score,
    },
  ]);

  console.log(result);

  return NextResponse.json({ success: true });
}
