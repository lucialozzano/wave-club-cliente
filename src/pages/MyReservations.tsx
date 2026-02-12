import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import Header from "../components/Activities/Header";
import type { Reservation } from "../types/Reservation";
import { ReservationService } from "../api/reservationService";
import { ActivityService } from "../api/activityService";
import Swal from "sweetalert2";

interface ExtendedReservation extends Reservation {
  activityName?: string;
}

const MyReservations = () => {
  const { userId, isLoggedIn } = useUser();
  const [reservations, setReservations] = useState<ExtendedReservation[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMyData = async () => {
    try {
      const [resvData, actData] = await Promise.all([
        ReservationService.getAll(),
        ActivityService.getAll()
      ]);

      const userResv = resvData.filter(r => Number(r.userId) === Number(userId));

      const merged = userResv.map(res => {
        const activity = actData.find(a => Number(a.id) === Number(res.activityId));

        console.log(`Reserva ${res.id} busca Actividad ${res.activityId} -> Encontrada:`, activity?.name);

        return {
          ...res,
          activityName: activity ? activity.name : "Actividad no encontrada"
        };
      });

      setReservations(merged);
    } catch (error) {
      console.error("Error cargando reservas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn && userId) loadMyData();
  }, [userId, isLoggedIn]);

  const handleDelete = async (res: ExtendedReservation) => {
    const confirm = await Swal.fire({
      title: '¿Cancelar reserva?',
      text: `Se liberará tu plaza para ${res.activityName}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelar',
    });

    if (!confirm.isConfirmed) return;

    try {
      await ReservationService.delete(res.id);

      try {
        const activity = await ActivityService.getById(res.activityId);
        if (activity) {
          await ActivityService.update(res.activityId, {
            ...activity,
            available: Number(activity.available) + 1
          });
        }
      } catch (e) { console.warn("Stock no actualizado"); }

      setReservations(prev => prev.filter(item => String(item.id) !== String(res.id)));

      Swal.fire('¡Eliminada!', 'Tu reserva ha sido cancelada.', 'success');

    } catch (error) {
      console.error("Error real en el servidor:", error);

      Swal.fire({
        title: 'Error de servidor',
        text: 'No se pudo borrar la reserva en la base de datos. Revisa la consola.',
        icon: 'error'
      });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-10">
        <h1 className="text-3xl font-bold text-cyan-600 mb-4">No estás logueado</h1>
        <p className="text-gray-500 mb-6">
          Debes <Link to="/login" className="text-cyan-600 font-semibold underline hover:text-cyan-800">iniciar sesión</Link> para ver tus reservas.
        </p>
        <Link
          to="/activities"
          className="bg-cyan-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-cyan-700 transition-all"
        >
          Explorar actividades
        </Link>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto p-10">
        <div className="flex justify-between items-end mb-10">
          <h1 className="text-4xl font-bold text-cyan-600">Mis Reservas</h1>
          <Link to="/" className="text-gray-400 hover:text-cyan-600 text-sm font-medium">← Volver al inicio</Link>
        </div>

        {loading ? (
          <p className="text-gray-500 italic">Cargando tus planes...</p>
        ) : reservations.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow-sm text-center border-2 border-dashed border-gray-200">
            <p className="text-gray-400 text-lg font-medium mb-6">No tienes ninguna actividad reservada todavía.</p>
            <Link to="/activities" className="bg-cyan-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-cyan-700 transition-all">
              Explorar actividades
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {reservations.map((res) => (
              <div key={res.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-l-8 border-cyan-500 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {res.activityName}
                  </h2>
                  <div className="flex gap-4 mt-2 text-gray-500 font-medium">
                    <span>📅 {res.date}</span>
                    <span>⏰ {res.start}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden sm:block bg-cyan-50 text-cyan-700 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest">
                    Confirmada
                  </div>
                  <button
                    onClick={() => handleDelete(res)}
                    className="bg-red-50 text-red-600 p-3 rounded-lg hover:bg-red-600 hover:text-white transition-all group"
                    title="Eliminar reserva"
                  >
                    <svg xmlns="http://www.w3.org" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReservations;
