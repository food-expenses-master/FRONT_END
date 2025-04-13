import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();

  (await cookies()).set("__session", token, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24, // 1일
  });

  return NextResponse.json({ status: "ok" });
}
