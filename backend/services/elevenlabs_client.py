import os
import httpx

# One voice per profile — both are free-tier premade voices
VOICE_MAP = {
    "jordan": "TxGEqnHWrfWFTfGW9XjX",  # Josh — casual, younger male (Jake)
    "alex":   "21m00Tcm4TlvDq8ikWAM",  # Rachel — warm, clear female (Maria)
}

ELEVENLABS_API = "https://api.elevenlabs.io/v1/text-to-speech"


class TTSError(Exception):
    pass


def synthesize(text: str, profile_id: str) -> bytes:
    """Returns raw MP3 bytes from ElevenLabs. Raises TTSError on failure."""
    api_key = os.getenv("ELEVENLABS_API_KEY")
    if not api_key:
        raise TTSError("ELEVENLABS_API_KEY not set")

    voice_id = VOICE_MAP.get(profile_id, VOICE_MAP["jordan"])
    url = f"{ELEVENLABS_API}/{voice_id}"

    headers = {
        "xi-api-key": api_key,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg",
    }
    payload = {
        "text": text,
        "model_id": "eleven_turbo_v2",  # fastest free-tier model
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.75,
        },
    }

    try:
        with httpx.Client(timeout=12) as client:
            r = client.post(url, headers=headers, json=payload)
            r.raise_for_status()
            return r.content
    except httpx.HTTPStatusError as e:
        raise TTSError(f"ElevenLabs API error {e.response.status_code}: {e.response.text}") from e
    except Exception as e:
        raise TTSError(f"ElevenLabs request failed: {e}") from e
