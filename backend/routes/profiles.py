from fastapi import APIRouter
from data.profiles import list_profiles

router = APIRouter()


@router.get("/profiles")
def get_profiles():
    return {"profiles": list_profiles()}
