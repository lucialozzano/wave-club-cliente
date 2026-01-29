import type { Activity } from "../types/Activity";

const API_URL = "http://localhost:3001/activities";

export const getActivities = async (): Promise<Activity[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error al obtener actividades");
  }

  return response.json();
};
