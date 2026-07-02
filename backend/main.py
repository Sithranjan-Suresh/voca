from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

key = os.getenv("GROQ_API_KEY")
print(f"[startup] GROQ_API_KEY: {'present' if key else 'MISSING'}")

# In production, set ALLOWED_ORIGIN to the deployed frontend URL (e.g. https://voca.vercel.app)
# Defaults to * for local development
allowed_origin = os.getenv("ALLOWED_ORIGIN", "*")

app = FastAPI(title="Voca API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[allowed_origin],
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["Content-Type"],
)

from routes import generate, profiles
app.include_router(generate.router)
app.include_router(profiles.router)


@app.get("/")
def health():
    return {"status": "ok"}
