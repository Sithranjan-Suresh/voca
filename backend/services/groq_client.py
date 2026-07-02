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
    True progressive streaming: emits each sentence the moment Groq finishes
    generating it. The model outputs numbered lines (1. 2. 3.); we detect
    completed lines from the token stream and push them immediately — no
    artificial delays, real latency drives the reveal.
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

    buffer = ""
    sentences = []

    try:
        for chunk in stream:
            token = chunk.choices[0].delta.content or ""
            buffer += token

            # Flush completed lines as they arrive
            while "\n" in buffer:
                line, buffer = buffer.split("\n", 1)
                line = line.strip()
                if not line:
                    continue
                for i, prefix in enumerate(["1.", "2.", "3."]):
                    if line.startswith(prefix):
                        text = line[len(prefix):].strip().strip('"').strip("'")
                        if text:
                            sentences.append(text)
                            yield f"data: {json.dumps({'index': i, 'partial': text})}\n\n"
                        break
    except Exception as e:
        yield f"data: {json.dumps({'error': str(e)})}\n\n"
        return

    # Handle final line with no trailing newline
    if buffer.strip():
        line = buffer.strip()
        for i, prefix in enumerate(["1.", "2.", "3."]):
            if line.startswith(prefix):
                text = line[len(prefix):].strip().strip('"').strip("'")
                if text:
                    sentences.append(text)
                    yield f"data: {json.dumps({'index': i, 'partial': text})}\n\n"
                break

    if sentences:
        yield f"data: {json.dumps({'sentences': sentences[:3]})}\n\n"
    else:
        yield f"data: {json.dumps({'error': 'parse_failed'})}\n\n"
    yield "data: [DONE]\n\n"


def _parse_sentences(raw: str) -> list[str]:
    # Primary: numbered list format (1. 2. 3.)
    lines = []
    for line in raw.splitlines():
        line = line.strip()
        if not line:
            continue
        for prefix in ["1.", "2.", "3.", "1)", "2)", "3)"]:
            if line.startswith(prefix):
                lines.append(line[len(prefix):].strip().strip('"').strip("'"))
                break
    if lines:
        return lines

    # Fallback: JSON array
    try:
        data = json.loads(raw)
        if isinstance(data, list) and all(isinstance(s, str) for s in data):
            return [s.strip() for s in data if s.strip()]
    except json.JSONDecodeError:
        pass

    return []
