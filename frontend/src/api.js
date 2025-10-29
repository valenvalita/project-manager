// Usar variable de entorno o localhost por defecto para desarrollo
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export async function getMessage() {
    const res = await fetch(`${API_URL}/`);
    return res.json();
}  