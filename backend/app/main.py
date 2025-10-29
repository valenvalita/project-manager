from typing import Optional
import os
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import get_db
from .models import Project, User, StatusEnum, PriorityEnum, RoleEnum
from .schemas import (
    ProjectCreate, ProjectRead, ProjectUpdate,
    UserCreate, UserRead, UserUpdate
)

# Las tablas ahora se crean mediante migraciones de Alembic
# Base.metadata.create_all(bind=engine) <- Ya no es necesario

app = FastAPI(title="Project Manager API")

from fastapi.middleware.cors import CORSMiddleware

# Configurar CORS - En producción usa variable de entorno FRONTEND_URL
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
allowed_origins = [
    frontend_url,
    "http://localhost:3000",  # Para desarrollo local
]

# Si FRONTEND_URL contiene una lista separada por comas
if "," in frontend_url:
    allowed_origins = frontend_url.split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def status():
    return {
        "message": "Backend ok"
    }

# CRUD Endpoints
@app.post("/projects/", response_model=ProjectRead)
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    db_project = Project(**project.dict())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

@app.get("/projects/", response_model=list[ProjectRead])
def list_projects(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    projects = db.query(Project).offset(skip).limit(limit).all()
    return projects

@app.get("/projects/{project_id}", response_model=ProjectRead)
def get_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@app.put("/projects/{project_id}", response_model=ProjectRead)
def update_project(project_id: int, project: ProjectCreate, db: Session = Depends(get_db)):
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    for key, value in project.dict(exclude_unset=True).items():
        setattr(db_project, key, value)
    db.commit()
    db.refresh(db_project)
    return db_project

@app.patch("/projects/{project_id}", response_model=ProjectRead)
def partial_update_project(project_id: int, project: ProjectUpdate, db: Session = Depends(get_db)):
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Solo actualizar los campos que fueron enviados
    update_data = project.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_project, key, value)
    
    db.commit()
    db.refresh(db_project)
    return db_project

@app.delete("/projects/{project_id}", status_code=204)
def delete_project(project_id: int, db: Session = Depends(get_db)):
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(db_project)
    db.commit()
    return

@app.get("/projects/filter/", response_model=list[ProjectRead])
def filter_projects(status: Optional[StatusEnum] = None, priority: Optional[PriorityEnum] = None, db: Session = Depends(get_db)):
    query = db.query(Project)
    if status:
        query = query.filter(Project.status == status)
    if priority:
        query = query.filter(Project.priority == priority)
    return query.all()

# ========== ENDPOINTS DE USUARIOS ==========

@app.post("/users/", response_model=UserRead, status_code=201)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Verificar si el email ya existe
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="El email ya está registrado")
    
    db_user = User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/", response_model=list[UserRead])
def list_users(skip: int = 0, limit: int = 100, active_only: bool = False, db: Session = Depends(get_db)):
    query = db.query(User)
    if active_only:
        query = query.filter(User.is_active == True)
    users = query.offset(skip).limit(limit).all()
    return users

@app.get("/users/{user_id}", response_model=UserRead)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user

@app.patch("/users/{user_id}", response_model=UserRead)
def update_user(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    # Verificar si el nuevo email ya existe (si se está cambiando)
    update_data = user.dict(exclude_unset=True)
    if 'email' in update_data and update_data['email'] != db_user.email:
        existing_user = db.query(User).filter(User.email == update_data['email']).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="El email ya está registrado")
    
    for key, value in update_data.items():
        setattr(db_user, key, value)
    
    db.commit()
    db.refresh(db_user)
    return db_user

@app.delete("/users/{user_id}", status_code=204)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    # Verificar si el usuario tiene proyectos asociados
    projects_created = db.query(Project).filter(Project.created_by_id == user_id).count()
    projects_assigned = db.query(Project).filter(Project.assigned_to_id == user_id).count()
    
    if projects_created > 0 or projects_assigned > 0:
        raise HTTPException(
            status_code=400, 
            detail=f"No se puede eliminar el usuario porque tiene {projects_created + projects_assigned} proyectos asociados"
        )
    
    db.delete(db_user)
    db.commit()
    return
