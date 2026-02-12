import type { Reservation } from "../../types/Reservation";
import type { Activity } from "../../types/Activity";
import type { User } from "../../types/User";

type Props = {
  reservations: Reservation[];
  activities: Activity[];
  usersList: User[];
  deleteItem: (type: "reservations", id: string | number) => void;
};

export default function ReservationsTab({
  reservations,
  activities,
  usersList,
  deleteItem,
}: Props) {

  const getActivity = (id: string | number) =>
    activities.find((a) => String(a.id) === String(id));

  const getUserName = (id: string | number) =>
    usersList.find((u) => String(u.id) === String(id))?.name || "Desconocido";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reservations.map((r) => {
        const activity = getActivity(r.activityId);

        return (
          <div
            key={r.id}
            className="bg-white p-8 rounded-[35px] shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-all duration-300"
          >
            <div className="mb-6">
              <h3 className="font-black text-slate-800 text-2xl leading-tight mb-1">
                {activity?.name || "Actividad no encontrada"}
              </h3>
              <p className="text-blue-600 font-black text-[11px] uppercase tracking-widest">
                {getUserName(r.userId)}
              </p>
            </div>

            {activity && (
              <div className="space-y-3 mb-8 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase w-14">Fecha</span>
                  <span className="text-xs font-bold text-slate-700">{activity.date}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase w-14">Hora</span>
                  <span className="text-xs font-bold text-slate-700">
                    {activity.start} — {activity.end}
                  </span>
                </div>
              </div>
            )}

            <div className="mt-auto flex justify-end">
              <button
                onClick={() => deleteItem("reservations", r.id)}
                className="group flex items-center gap-2 text-red-400 hover:text-red-600 transition-colors"
              >
                <span className="font-black text-[10px] uppercase tracking-tighter">
                  Anular Reserva
                </span>
                <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-100">
                  <span className="text-[10px]">✕</span>
                </div>
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
