def analyze_lecture(transcript, reference):

    if not transcript or not reference:
        return {
            "matchPercentage": 0,
            "summary": "",
            "voiceProbability": 0
        }

    ref = set(reference.split())
    txt = set(transcript.split())

    match = len(ref & txt)

    percent = int((match / len(ref)) * 100) if ref else 0

    return {
        "matchPercentage": percent,
        "summary": transcript[:200],
        "voiceProbability": 85
    }