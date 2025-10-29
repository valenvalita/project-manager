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
        method: 'PATCH',
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

// Actualización parcial específica (envía solo los campos especificados)
export async function patchProject(id, partialData) {
    const res = await fetch(`${API_URL}/projects/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(partialData),
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

// ========== FUNCIONES DE USUARIOS ==========

export async function getUsers() {
    const res = await fetch(`${API_URL}/users/`);
    if (!res.ok) throw new Error('Error al obtener usuarios');
    return res.json();
}

export async function getUser(id) {
    const res = await fetch(`${API_URL}/users/${id}`);
    if (!res.ok) throw new Error('Error al obtener usuario');
    return res.json();
}

export async function createUser(userData) {
    const res = await fetch(`${API_URL}/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || 'Error al crear usuario');
    }
    return res.json();
}

export async function updateUser(id, userData) {
    const res = await fetch(`${API_URL}/users/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || 'Error al actualizar usuario');
    }
    return res.json();
}

export async function deleteUser(id) {
    const res = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || 'Error al eliminar usuario');
    }
    return { success: true };
}