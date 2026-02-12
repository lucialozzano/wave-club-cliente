import type { Activity } from "../types/Activity";

const API_URL = "http://localhost:3001/activities";

export const ActivityService = {
  getAll: async (): Promise<Activity[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      console.error(await response.text());
      throw new Error("Error al obtener actividades");
    }
    return response.json();
  },

  getById: async (id: number | string): Promise<Activity> => {
    const response = await fetch(`${API_URL}/${id.toString()}`);
    if (!response.ok) throw new Error("Actividad no encontrada");
    return response.json();
  },

  create: async (activity: Activity): Promise<void> => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activity),
    });
    if (!response.ok) throw new Error("Error al crear la actividad");
  },

  update: async (id: number | string, activity: Activity): Promise<void> => {
    const response = await fetch(`${API_URL}/${id.toString()}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activity),
    });
    if (!response.ok) throw new Error("Error al actualizar la disponibilidad");
    await response.json();
  },

  delete: async (id: number | string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id.toString()}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      console.error(await response.text());
      throw new Error("Error al eliminar la actividad");
    }
  },
};
