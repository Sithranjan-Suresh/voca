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
    """Non-streaming fallback — used by tests."""
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


def stream_sentences(prompt: str):
    """
    Generator that yields SSE-formatted strings.
    Buffers the full response, parses it once, then streams
    words one-by-one per sentence for a live typewriter effect.
    """
    import time

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
        yield f"data: {json.dumps({'error': str(e)})}\n\n"
        return

    raw = response.choices[0].message.content.strip()
    sentences = _parse_sentences(raw)

    if not sentences:
        yield f"data: {json.dumps({'error': 'parse_failed'})}\n\n"
        return

    sentences = sentences[:3]

    # Stream each sentence word by word
    for idx, sentence in enumerate(sentences):
        words = sentence.split()
        partial = ""
        for word in words:
            partial = partial + (" " if partial else "") + word
            payload = json.dumps({"index": idx, "partial": partial})
            yield f"data: {payload}\n\n"
            time.sleep(0.04)

    # Final event with all complete sentences
    yield f"data: {json.dumps({'sentences': sentences})}\n\n"
    yield "data: [DONE]\n\n"


def _parse_sentences(raw: str) -> list[str]:
    try:
        data = json.loads(raw)
        if isinstance(data, list) and all(isinstance(s, str) for s in data):
            return [s.strip() for s in data if s.strip()]
    except json.JSONDecodeError:
        pass

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
