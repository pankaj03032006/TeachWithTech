import { connectDB } from "@/lib/db";
import Lecture from "@/models/Lecture";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { audioProcessor } from "@/lib/audioProcessor";
import { analyzeLectureAI } from "@/lib/aiClient";

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const audio = formData.get("audio") as File;
    const lectureId = formData.get("lectureId") as string;

    // ❗ validation
    if (!audio || !lectureId) {
      return NextResponse.json(
        { error: "Missing audio or lectureId" },
        { status: 400 }
      );
    }

    const bytes = await audio.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}.webm`;

    // 🔥 use temp folder (clean approach)
    const dir = path.join(process.cwd(), "temp");

    // ✅ always ensure folder exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, filename);

    // ✅ save file temporarily
    await fs.promises.writeFile(filePath, buffer);

    // 🎙️ TRANSCRIPTION
    const result = await audioProcessor.process(filePath);

    // ❗ check lecture exists
    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
      // cleanup before exit
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      return NextResponse.json(
        { error: "Lecture not found" },
        { status: 404 }
      );
    }

    // 🧠 AI ANALYSIS (microservice)
    const ai = await analyzeLectureAI({
      transcript: result.text || "",
      reference: lecture.referenceTranscript || "",
    });

    // ✅ save final result (NO AUDIO STORAGE)
    await Lecture.findByIdAndUpdate(lectureId, {
      transcript: result.text,
      endTime: new Date(),
      status: "analyzed",
      analysis: ai,
    });

    // 🧹 CLEANUP (safe delete)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return NextResponse.json({
      success: true,
      message: "Lecture processed successfully",
    });

  } catch (error: any) {

    console.error("UPLOAD AUDIO ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}