import type { Reservation } from "../types/Reservation";

const API_URL = "http://localhost:3001/reservations";

export const ReservationService = {
  getAll: async (): Promise<Reservation[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      console.error(await response.text());
      throw new Error("Error al obtener reservas");
    }
    return response.json();
  },

  getById: async (id: number | string): Promise<Reservation> => {
    const response = await fetch(`${API_URL}/${id.toString()}`);
    if (!response.ok) {
      console.error(await response.text());
      throw new Error("Error al obtener la reserva");
    }
    return response.json();
  },

  create: async (reservation: Reservation): Promise<Reservation> => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservation),
    });
    if (!response.ok) {
      const errorLog = await response.text();
      console.error("Error API:", errorLog);
      throw new Error("Error al crear reserva");
    }
    return response.json();
  },

  update: async (id: number | string, reservation: Reservation): Promise<void> => {
    const response = await fetch(`${API_URL}/${id.toString()}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservation),
    });
    if (!response.ok) {
      console.error(await response.text());
      throw new Error("Error al actualizar la reserva");
    }
    await response.json();
  },

  delete: async (id: number | string): Promise<void> => {
    const cleanId = String(id).trim();
    const response = await fetch(`http://localhost:3001/reservations/${cleanId}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: No se pudo borrar`);
    }
  }

};
