from youtube_transcript_api import YouTubeTranscriptApi

def get_youtube_transcript(url):
    try:
        video_id = url.split("v=")[-1]
        data = YouTubeTranscriptApi.get_transcript(video_id)
        return " ".join([t["text"] for t in data])
    except:
        return "Transcript not available"