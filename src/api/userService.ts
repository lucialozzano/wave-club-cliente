import type { User } from "../types/User";

const API_URL = "http://localhost:3001/users";

export const UserService = {
  getAll: async (): Promise<User[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener usuarios");
    return response.json();
  },

  getById: async (id: number | string): Promise<User> => {
    const response = await fetch(`${API_URL}/${id.toString()}`);
    if (!response.ok) throw new Error("Error al obtener el usuario");
    return response.json();
  },

  create: async (user: User): Promise<void> => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error("Error al crear el usuario");
  },

  update: async (id: number | string, user: User): Promise<void> => {
    const cleanId = id.toString();

    const response = await fetch(`${API_URL}/${cleanId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...user, id: cleanId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Respuesta servidor:", errorText);
      throw new Error("Error al actualizar el usuario");
    }

    await response.json();
  },


  delete: async (id: number | string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id.toString()}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar el usuario");
  },
};
