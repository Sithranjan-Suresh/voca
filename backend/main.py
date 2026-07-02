from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

key = os.getenv("GROQ_API_KEY")
print(f"[startup] GROQ_API_KEY: {'present' if key else 'MISSING'}")

app = FastAPI(title="Voca API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

from routes import generate, profiles
app.include_router(generate.router)
app.include_router(profiles.router)

@app.get("/")
def health():
    return {"status": "ok"}
