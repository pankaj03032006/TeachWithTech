import fs from "fs";
import path from "path";
import axios from "axios";
import { assemblyAI } from "./assemblyAI";

class AudioProcessor {
  async process(filePath: string) {
    const data = fs.readFileSync(filePath);

    const upload = await axios.post(
      "https://api.assemblyai.com/v2/upload",
      data,
      {
        headers: {
          Authorization: process.env.ASSEMBLYAI_API_KEY!,
        },
      }
    );

    const result = await assemblyAI.transcribeAudio(upload.data.upload_url);

    return {
      text: result.text,
      confidence: result.confidence,
    };
  }
}

export const audioProcessor = new AudioProcessor();