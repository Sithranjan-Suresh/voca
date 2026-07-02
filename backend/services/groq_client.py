import os
import json
from groq import Groq

_client = None


def _get_client() -> Groq:
    global _client
    if _client is None:
        _client = Groq(api_key=os.getenv("GROQ_API_KEY"))
    return _client


class GenerationError(Exception):
    pass


def generate_sentences(prompt: str) -> list[str]:
    client = _get_client()

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.8,
            max_tokens=300,
            timeout=9,
        )
    except Exception as e:
        raise GenerationError(f"Groq API call failed: {e}") from e

    raw = response.choices[0].message.content.strip()

    sentences = _parse_sentences(raw)
    if not sentences:
        raise GenerationError(f"Could not parse sentences from response: {raw!r}")

    return sentences[:3]


def _parse_sentences(raw: str) -> list[str]:
    # Try JSON array first (the format we asked for)
    try:
        data = json.loads(raw)
        if isinstance(data, list) and all(isinstance(s, str) for s in data):
            return [s.strip() for s in data if s.strip()]
    except json.JSONDecodeError:
        pass

    # Fallback: extract numbered lines (1. ... or 1) ...)
    lines = []
    for line in raw.splitlines():
        line = line.strip()
        if not line:
            continue
        for prefix in ["1.", "2.", "3.", "1)", "2)", "3)"]:
            if line.startswith(prefix):
                lines.append(line[len(prefix):].strip().strip('"'))
                break

    return lines if lines else []
