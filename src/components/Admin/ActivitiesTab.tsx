import type { Activity } from "../../types/Activity";

export default function ActivitiesTab({
  activities,
  openCreate,
  openEdit,
  deleteItem,
}: {
  activities: Activity[];
  openCreate: () => void;
  openEdit: (a: Activity) => void;
  deleteItem: (type: "activities", id: string | number) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={openCreate}
          className="bg-[#3af8f5] text-slate-800 px-8 py-4 rounded-2xl font-black text-xs uppercase shadow-xl hover:scale-105 transition-transform"
        >
          + Crear Actividad
        </button>
      </div>

      {activities.map((a) => (
        <div
          key={a.id}
          className="bg-white p-8 rounded-[35px] shadow-sm flex justify-between items-center border border-slate-50 hover:border-[#3af8f5] transition-all"
        >
          <div>
            <h3 className="font-black text-slate-800 text-xl">{a.name}</h3>
            <p className="text-slate-400 font-bold text-sm italic">
              {a.date} • {a.start}h - {a.end}h
            </p>
          </div>

          <div className="flex items-center gap-10">
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-300 uppercase">
                Disponibles
              </p>
              <p className="text-2xl font-black text-slate-800">
                {a.available}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => openEdit(a)}
                className="text-blue-500 font-black text-xs uppercase hover:underline"
              >
                Editar
              </button>

              <button
                onClick={() => deleteItem("activities", String(a.id))}
                className="text-red-400 font-black text-xs uppercase hover:text-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
