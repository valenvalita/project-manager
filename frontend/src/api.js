// Usar variable de entorno o localhost por defecto para desarrollo
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export async function getMessage() {
    const res = await fetch(`${API_URL}/`);
    return res.json();
}

export async function getProjects() {
    const res = await fetch(`${API_URL}/projects`);
    if (!res.ok) throw new Error('Error al obtener proyectos');
    return res.json();
}

export async function getProject(id) {
    const res = await fetch(`${API_URL}/projects/${id}`);
    if (!res.ok) throw new Error('Error al obtener proyecto');
    return res.json();
}

export async function createProject(projectData) {
    const res = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || 'Error al crear proyecto');
    }
    return res.json();
}

export async function updateProject(id, projectData) {
    const res = await fetch(`${API_URL}/projects/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || 'Error al actualizar proyecto');
    }
    return res.json();
}

export async function deleteProject(id) {
    const res = await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Error al eliminar proyecto');
    return { success: true };
}