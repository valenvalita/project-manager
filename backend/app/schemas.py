from enum import Enum
from pydantic import BaseModel, model_validator, field_validator
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

    @model_validator(mode="before")
    def check_dates(cls, values):
        start = values.get('start_date')
        end = values.get('end_date')
        if start and end and start > end:
            raise ValueError('start_date debe ser menor que end_date')
        return values

    @field_validator('budget')
    def budget_must_be_positive(cls, v):
        if v is not None and v < 0:
            raise ValueError('budget debe ser mayor o igual a 0')
        return v
        return v

class ProjectRead(ProjectCreate):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True