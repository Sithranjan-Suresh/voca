from fastapi import APIRouter
from fastapi.responses import Response, JSONResponse
from pydantic import BaseModel
from services.elevenlabs_client import synthesize, TTSError

router = APIRouter()


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
