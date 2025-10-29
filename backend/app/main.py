from fastapi import FastAPI

from .database import Base, engine
from .models import Project

Base.metadata.create_all(bind=engine)

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], #TODO: Limitar a solo el frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def status():
    return {
        "message": "Backend ok"
        }
