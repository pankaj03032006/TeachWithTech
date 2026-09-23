import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text } = await req.json();

  // later connect Python microservice here
  return NextResponse.json({
    summary: text.slice(0, 200),
  });
}