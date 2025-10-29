from enum import Enum
from sqlalchemy import Column, Integer, String, Text, DateTime, Float, Enum as SQLEnum
from datetime import datetime
from .database import Base
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class StatusEnum(str, Enum):
    draft = "draft"
    in_progress = "in_progress"
    completed = "completed"
    cancelled = "cancelled"

class PriorityEnum(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"

class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)

    # Estado y prioridad
    status = Column(SQLEnum(StatusEnum), default=StatusEnum.draft)
    priority = Column(SQLEnum(PriorityEnum), default=PriorityEnum.medium)

    # Fechas
    start_date = Column(DateTime, nullable=True)
    end_date = Column(DateTime, nullable=True)
    due_date = Column(DateTime, nullable=True)
    completion_date = Column(DateTime, nullable=True)

    # Presupuesto
    budget = Column(Float, nullable=True)
    actual_cost = Column(Float, nullable=True)

    # Timestamps
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now)
