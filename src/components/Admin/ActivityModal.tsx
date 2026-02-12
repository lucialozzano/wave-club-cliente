import type { Dispatch, SetStateAction } from "react";
import type { Activity } from "../../types/Activity";
import { ActivityService } from "../../api/activityService";

type Props = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  isEditing: boolean;
  formData: Activity;
  setFormData: Dispatch<SetStateAction<Activity>>;
  currentId: string | number | null;
  fetchData: () => void;
};


export default function ActivityModal({
  showModal,
  setShowModal,
  isEditing,
  formData,
  setFormData,
  currentId,
  fetchData,
}: Props) {
  if (!showModal) return null;

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        if (currentId === null) throw new Error("No se encontró el ID de la actividad");
        await ActivityService.update(String(currentId), formData);
      } else {
        await ActivityService.create(formData);
      }

      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error("Error al guardar la actividad:", error);
      alert("Hubo un problema al guardar la actividad.");
    }
  };

  const fields: (keyof Omit<Activity, "available" | "id">)[] = [
    "name",
    "description",
    "date",
    "start",
    "end",
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-10 rounded-3xl w-[520px] shadow-xl">
        <h2 className="text-xl font-black mb-6">
          {isEditing ? "Editar actividad" : "Crear actividad"}
        </h2>

        {fields.map((field) => (
          <input
            key={field}
            placeholder={field}
            value={formData[field]}
            onChange={(e) =>
              setFormData({ ...formData, [field]: e.target.value })
            }
            className="w-full border p-3 rounded-xl mb-3"
          />
        ))}

        <input
          type="number"
          placeholder="Plazas disponibles"
          value={formData.available}
          onChange={(e) =>
            setFormData({ ...formData, available: Number(e.target.value) })
          }
          className="w-full border p-3 rounded-xl mb-6"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowModal(false)}
            className="px-5 py-2 border rounded-xl"
          >
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-[#3af8f5] rounded-xl font-black"
          >
            {isEditing ? "Guardar cambios" : "Crear"}
          </button>
        </div>
      </div>
    </div>
  );
}
