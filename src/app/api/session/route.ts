import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      const body = await req.json();
      const token = body?.token;
  
      if (!token) {
        console.warn("❌ 토큰 없음");
        return NextResponse.json({ error: "No token provided" }, { status: 400 });
      }
  
      // 쿠키로 저장
      (await
            cookies()).set("__session", token, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24,
      });
  
      return NextResponse.json({ status: "ok" });
    } catch (e: any) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }
  