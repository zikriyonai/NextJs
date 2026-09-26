import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { addMessage, listMessages } from "@/lib/db";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { message } = await req.json();
  if (!message?.trim()) return NextResponse.json({ error: "Message is required." }, { status: 400 });

  const userId = session.user.id;
  await addMessage(userId, params.id, "user", message);

  // PLACEHOLDER — swap for a real call to your trained Zikriyon Atom
  // inference server once training + serving is ready.
  const reply = `Zikriyon Atom is still training. Once it's ready, real answers to "${message}" will appear here.`;

  await addMessage(userId, params.id, "assistant", reply);
  return NextResponse.json({ messages: await listMessages(userId, params.id) });
}
