from enum import Enum
from sqlalchemy import Column, Integer, String, Text, DateTime, Float, Enum as SQLEnum, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base
from sqlalchemy.sql import func

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

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    role = Column(SQLEnum(RoleEnum), default=RoleEnum.user)
    is_active = Column(Boolean, default=True)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=func.now())
    
    # Relaciones
    created_projects = relationship("Project", back_populates="creator", foreign_keys="Project.created_by_id")
    assigned_projects = relationship("Project", back_populates="assigned_to", foreign_keys="Project.assigned_to_id")

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
    
    # Relaciones con usuarios
    created_by_id = Column(Integer, ForeignKey('users.id'), nullable=True)
    assigned_to_id = Column(Integer, ForeignKey('users.id'), nullable=True)

    # Timestamps
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=func.now())
    
    # Relaciones
    creator = relationship("User", back_populates="created_projects", foreign_keys=[created_by_id])
    assigned_to = relationship("User", back_populates="assigned_projects", foreign_keys=[assigned_to_id])
