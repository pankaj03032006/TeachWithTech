import { NextResponse } from "next/server";
import { youtubeService } from "@/lib/aiClient";
import Transcript from "@/models/Transcript";
import {connectDB} from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    await connectDB();

    const text = await youtubeService.getTranscript(url);

    const saved = await Transcript.create({
      type: "youtube",
      source: url,
      text,
    });

    return NextResponse.json(saved);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}