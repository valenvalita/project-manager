from enum import Enum
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class StatusEnum(str, Enum):
    draft = "draft"
    in_progress = "in_progress"
    completed = "completed"
    cancelled = "cancelled"

class PriorityEnum(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"

class ProjectCreate(BaseModel):
    title: str
    description: Optional[str] = None
    status: Optional[StatusEnum] = StatusEnum.draft
    priority: Optional[PriorityEnum] = PriorityEnum.medium
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    due_date: Optional[datetime] = None
    budget: Optional[float] = None

class ProjectRead(ProjectCreate):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True