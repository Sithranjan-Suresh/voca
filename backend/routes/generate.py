from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from data.profiles import get_profile
from services.prompt_builder import build_prompt
from services.groq_client import generate_sentences, GenerationError

router = APIRouter()


class GenerateRequest(BaseModel):
    profile_id: str = "jordan"
    concept_ids: list[str]
    excluded_sentences: list[str] = []


@router.post("/generate")
def generate(req: GenerateRequest):
    if len(req.concept_ids) < 2:
        return JSONResponse(
            status_code=400,
            content={
                "error": "too_few_concepts",
                "message": "Please select at least 2 ideas before generating.",
            },
        )

    profile = get_profile(req.profile_id)
    prompt = build_prompt(req.concept_ids, profile, req.excluded_sentences)

    try:
        sentences = generate_sentences(prompt)
    except GenerationError as e:
        return JSONResponse(
            status_code=502,
            content={
                "error": "generation_failed",
                "message": "Could not generate a sentence. Please try again.",
            },
        )

    return {"sentences": sentences}
