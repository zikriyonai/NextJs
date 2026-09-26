import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Please log in first." }, { status: 401 });
  }

  const { message } = await req.json();

  // PLACEHOLDER — replace this block with a real call to your trained
  // Zikriyon Atom inference server once training + serving is ready.
  const reply = `Zikriyon Atom is still training. Once it's ready, real answers to "${message}" will appear here.`;

  return NextResponse.json({ reply });
}
