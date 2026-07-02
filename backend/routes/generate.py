from fastapi import APIRouter
from fastapi.responses import JSONResponse, StreamingResponse
from pydantic import BaseModel
from data.profiles import get_profile
from services.prompt_builder import build_prompt
from services.groq_client import generate_sentences, stream_sentences, GenerationError

router = APIRouter()


EMERGENCY_IDS = {"chest_pain", "fall", "help_me", "call_emergency", "cant_breathe"}


class GenerateRequest(BaseModel):
    profile_id: str = "jordan"
    concept_ids: list[str]
    excluded_sentences: list[str] = []
    stream: bool = True


@router.post("/generate")
def generate(req: GenerateRequest):
    has_emergency = any(c in EMERGENCY_IDS for c in req.concept_ids)
    min_required = 1 if has_emergency else 2
    if len(req.concept_ids) < min_required:
        return JSONResponse(
            status_code=400,
            content={
                "error": "too_few_concepts",
                "message": "Please select at least 2 ideas before generating.",
            },
        )

    profile = get_profile(req.profile_id)
    prompt = build_prompt(req.concept_ids, profile, req.excluded_sentences)

    if req.stream:
        return StreamingResponse(
            stream_sentences(prompt),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "X-Accel-Buffering": "no",
            },
        )

    try:
        sentences = generate_sentences(prompt)
    except GenerationError:
        return JSONResponse(
            status_code=502,
            content={
                "error": "generation_failed",
                "message": "Could not generate a sentence. Please try again.",
            },
        )

    return {"sentences": sentences}
