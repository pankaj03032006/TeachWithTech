const BASE = "http://localhost:5001";

export async function analyzeLectureAI(data: any) {
  const res = await fetch(`${BASE}/analyze-lecture`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function getYoutubeAI(url: string) {
  const res = await fetch(`${BASE}/youtube-transcript`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  return res.json();
}