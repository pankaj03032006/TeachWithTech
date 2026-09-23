from flask import Flask, request, jsonify
from lecture import analyze_lecture
from youtube import get_youtube_transcript

app = Flask(__name__)

@app.route("/")
def home():
    return jsonify({"status": "running"})


@app.route("/analyze-lecture", methods=["POST"])
def analyze():
    data = request.json
    return jsonify(analyze_lecture(data["transcript"], data["reference"]))


@app.route("/youtube-transcript", methods=["POST"])
def youtube():
    data = request.json
    text = get_youtube_transcript(data["url"])
    return jsonify({"text": text})


if __name__ == "__main__":
    app.run(port=5001, debug=True)