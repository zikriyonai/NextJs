import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!email || !password || password.length < 6) {
    return NextResponse.json(
      { error: "Email and a password of at least 6 characters are required." },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
  }

  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: { name: name || null, email, hashedPassword },
  });

  return NextResponse.json({ id: user.id, email: user.email }, { status: 201 });
}
