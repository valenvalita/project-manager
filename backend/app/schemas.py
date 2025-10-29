from enum import Enum
from pydantic import BaseModel, model_validator, field_validator, EmailStr
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

class RoleEnum(str, Enum):
    admin = "admin"
    manager = "manager"
    user = "user"

# Schemas de Usuario
class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: Optional[RoleEnum] = RoleEnum.user
    is_active: Optional[bool] = True

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    role: Optional[RoleEnum] = None
    is_active: Optional[bool] = None

class UserRead(UserBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Schema simplificado para mostrar en proyectos
class UserSimple(BaseModel):
    id: int
    name: str
    email: str
    
    class Config:
        from_attributes = True

class ProjectCreate(BaseModel):
    title: str
    description: Optional[str] = None
    status: Optional[StatusEnum] = StatusEnum.draft
    priority: Optional[PriorityEnum] = PriorityEnum.medium
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    due_date: Optional[datetime] = None
    budget: Optional[float] = None
    created_by_id: Optional[int] = None
    assigned_to_id: Optional[int] = None

    @model_validator(mode="before")
    def check_dates(cls, values):
        if isinstance(values, dict):
            start = values.get('start_date')
            end = values.get('end_date')
        else:
            start = getattr(values, 'start_date', None)
            end = getattr(values, 'end_date', None)
        
        if start and end and start > end:
            raise ValueError('start_date debe ser menor que end_date')
        return values

    @field_validator('budget')
    def budget_must_be_positive(cls, v):
        if v is not None and v < 0:
            raise ValueError('budget debe ser mayor o igual a 0')
        return v

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[StatusEnum] = None
    priority: Optional[PriorityEnum] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    due_date: Optional[datetime] = None
    budget: Optional[float] = None
    created_by_id: Optional[int] = None
    assigned_to_id: Optional[int] = None

    @model_validator(mode="before")
    def check_dates(cls, values):
        if isinstance(values, dict):
            start = values.get('start_date')
            end = values.get('end_date')
        else:
            start = getattr(values, 'start_date', None)
            end = getattr(values, 'end_date', None)
        
        if start and end and start > end:
            raise ValueError('start_date debe ser menor que end_date')
        return values

    @field_validator('budget')
    def budget_must_be_positive(cls, v):
        if v is not None and v < 0:
            raise ValueError('budget debe ser mayor o igual a 0')
        return v

class ProjectRead(ProjectCreate):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    creator: Optional[UserSimple] = None
    assigned_to: Optional[UserSimple] = None

    class Config:
        from_attributes = True