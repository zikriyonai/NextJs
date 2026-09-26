import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createProject, listProjects } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ projects: await listProjects(session.user.id) });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { name, color } = await req.json();
  if (!name) return NextResponse.json({ error: "Project name is required." }, { status: 400 });
  const id = await createProject(session.user.id, name, color || "#4F46E5");
  return NextResponse.json({ id }, { status: 201 });
}
