from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ProjectCreate(BaseModel):
    title: str
    description: Optional[str] = None
    status: Optional[str] = "draft"
    created_at: Optional[datetime] = datetime.now() # fecha actual
    updated_at: Optional[datetime] = None # fecha actual

class ProjectRead(ProjectCreate):
    id: int
    class Config:
        orm_mode = True