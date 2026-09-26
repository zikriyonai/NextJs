import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { editMessageAndTruncate, addMessage, listMessages } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: { id: string; messageId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { text } = await req.json();
  if (!text?.trim()) return NextResponse.json({ error: "Message text is required." }, { status: 400 });

  const userId = session.user.id;
  await editMessageAndTruncate(userId, params.id, params.messageId, text);

  // PLACEHOLDER — swap for a real call to your trained Zikriyon Atom
  // inference server once training + serving is ready.
  const reply = `Zikriyon Atom is still training. Once it's ready, a fresh answer to your edited message will appear here.`;
  await addMessage(userId, params.id, "assistant", reply);

  return NextResponse.json({ messages: await listMessages(userId, params.id) });
}
