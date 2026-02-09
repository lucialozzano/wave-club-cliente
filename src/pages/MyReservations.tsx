import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom"; 
import Header from "../components/Activities/Header";
import type { Reservation } from "../types/Reservation";
import type { Activity } from "../types/Activity";

interface ExtendedReservation extends Reservation {
  activityName?: string;
}

const MyReservations = () => {
  const { userId, isLoggedIn } = useUser();
  const [reservations, setReservations] = useState<ExtendedReservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn || !userId) return;

    const loadMyData = async () => {
      try {
        const resResv = await fetch(`http://localhost:3001/reservations?userId=${userId}`);
        const resvData: Reservation[] = await resResv.json();

        const resAct = await fetch(`http://localhost:3001/activities`);
        const actData: Activity[] = await resAct.json();

        const merged = resvData.map(res => {
          const activity = actData.find(a => a.id === res.activityId);
          return { ...res, activityName: activity?.name };
        });

        setReservations(merged);
      } catch (error) {
        console.error("Error cargando reservas:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMyData();
  }, [userId, isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Acceso restringido</h2>
            <p className="text-gray-600 mb-8">
              Para ver tus actividades reservadas, primero debes estar dentro de tu cuenta.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                className="bg-black text-white font-bold py-3 rounded-xl hover:bg-cyan-700 transition-all shadow-md"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/"
                className="text-gray-500 font-medium hover:text-gray-800 py-2 transition-all"
              >
                Volver a Home
              </Link>
            </div>
          </div>
        </div>
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
                    {res.activityName || "Actividad no encontrada"}
                  </h2>
                  <div className="flex gap-4 mt-2 text-gray-500 font-medium">
                    <span>📅 {res.date}</span>
                    <span>⏰ {res.start}</span>
                  </div>
                </div>
                <div className="bg-cyan-50 text-cyan-700 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest">
                  Confirmada
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
