from fastapi import APIRouter
from fastapi.responses import Response, JSONResponse
from pydantic import BaseModel
from services.elevenlabs_client import synthesize, TTSError

router = APIRouter()


@router.get("/tts/status")
def tts_status():
    """Returns 200 if ElevenLabs key is configured, 503 otherwise."""
    import os
    if os.getenv("ELEVENLABS_API_KEY"):
        return {"status": "available", "provider": "elevenlabs"}
    return Response(
        content='{"status":"unavailable"}',
        status_code=503,
        media_type="application/json",
    )


class TTSRequest(BaseModel):
    text: str
    profile_id: str = "jordan"


@router.post("/tts")
def tts(req: TTSRequest):
    if not req.text.strip():
        return JSONResponse(status_code=400, content={"error": "text is required"})

    try:
        audio_bytes = synthesize(req.text.strip(), req.profile_id)
    except TTSError as e:
        return JSONResponse(status_code=502, content={"error": str(e)})

    return Response(
        content=audio_bytes,
        media_type="audio/mpeg",
        headers={"Cache-Control": "no-store"},
    )
