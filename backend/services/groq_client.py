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
    """Non-streaming — used by tests."""
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
    Uses Groq's native stream=True so tokens arrive as they are generated —
    no artificial delay. Accumulates per-sentence partials and emits them as
    each new token arrives, then emits the final parsed sentences event.
    """
    client = _get_client()
    try:
        stream = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.8,
            max_tokens=300,
            timeout=15,
            stream=True,
        )
    except Exception as e:
        yield f"data: {json.dumps({'error': str(e)})}\n\n"
        return

    full_text = ""
    for chunk in stream:
        delta = chunk.choices[0].delta.content or ""
        if not delta:
            continue
        full_text += delta

        # Emit a partial update on every token so the client sees live output
        payload = json.dumps({"index": 0, "partial": full_text.strip()})
        yield f"data: {payload}\n\n"

    # Parse final text and emit the structured sentences event
    sentences = _parse_sentences(full_text.strip())
    if not sentences:
        # Fallback: treat the whole response as one sentence
        sentences = [full_text.strip()] if full_text.strip() else []

    sentences = sentences[:3]
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
