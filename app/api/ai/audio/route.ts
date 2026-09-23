import { NextResponse } from "next/server";
import { audioProcessor } from "@/lib/audioProcessor";
import Transcript from "@/models/Transcript";
import {connectDB} from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { filename } = await req.json();

    await connectDB();

    const result = await audioProcessor.process(filename);

    const saved = await Transcript.create({
      type: "audio",
      source: filename,
      text: result.text,
      confidence: result.confidence,
    });

    return NextResponse.json(saved);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}