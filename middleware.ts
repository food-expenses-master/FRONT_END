import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/fireabaseAdmin";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("__session")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    await adminAuth.verifyIdToken(token);
    return NextResponse.next();
  } catch (error) {
    console.error("Invalid token", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/protected/:path*"], // 인증이 필요한 경로 지정
};
