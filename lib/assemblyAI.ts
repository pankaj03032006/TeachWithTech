import axios from "axios";

class AssemblyAIService {
  private apiKey = process.env.ASSEMBLYAI_API_KEY!;
  private baseURL = "https://api.assemblyai.com/v2";

  async transcribeAudio(audioUrl: string) {
    const res = await axios.post(
      `${this.baseURL}/transcript`,
      {
        audio_url: audioUrl,
        speech_model: "best",
      },
      {
        headers: { Authorization: this.apiKey },
      }
    );

    return this.poll(res.data.id);
  }

  async poll(id: string) {
    while (true) {
      const res = await axios.get(`${this.baseURL}/transcript/${id}`, {
        headers: { Authorization: this.apiKey },
      });

      if (res.data.status === "completed") {
        return res.data;
      }

      if (res.data.status === "error") {
        throw new Error(res.data.error);
      }

      await new Promise((r) => setTimeout(r, 3000));
    }
  }
}

export const assemblyAI = new AssemblyAIService();