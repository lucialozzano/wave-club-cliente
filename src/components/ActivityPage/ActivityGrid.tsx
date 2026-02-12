import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useUser } from "../../context/UserContext";
import type { Activity } from "../../types/Activity";
import { ReservationService } from "../../api/reservationService";
import { ActivityService } from "../../api/activityService";
import Swal from 'sweetalert2';


const slugMap: Record<string, string> = {
  surf: "Surf",
  windsurf: "Windsurf",
  piraguismo: "Piragüismo",
  natacion: "Natación en aguas abiertas",
};

const ActivityGrid = () => {
  const { activityName } = useParams<{ activityName: string }>();
  const [classes, setClasses] = useState<Activity[]>([]);
  const { isLoggedIn, userId } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const hasReserved = useRef(false);

  const displayName = activityName ? slugMap[activityName] || activityName : "";


  const handleReserve = async (cls: Activity) => {
    if (cls.available <= 0) return;

    const result = await Swal.fire({
      title: '¿Confirmar reserva?',
      text: `Vas a reservar ${cls.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0891b2',
      confirmButtonText: '¡Sí, reservar!'
    });

    if (!result.isConfirmed) return;

    try {
      const newReservation = {
        userId: Number(userId),
        activityId: Number(cls.id),
        date: cls.date,
        start: cls.start,
      };

      // Creo la reserva en el servidor
      // para que JSON Server lo genere automáticamente.
      // @ts-expect-error: omitimos id para creación automática en el servidor
      await ReservationService.create(newReservation);

      const updatedActivity = {
        ...cls,
        id: Number(cls.id),
        available: Number(cls.available) - 1
      };

      await ActivityService.update(Number(cls.id), updatedActivity);

      setClasses(prev =>
        prev.map(c => Number(c.id) === Number(cls.id) ? updatedActivity : c)
      );

      Swal.fire('¡Reservado!', 'Tu plaza está confirmada.', 'success');

    } catch (error) {
      console.error("ERROR EN RESERVA:", error);
      Swal.fire('Error', 'No se pudo completar la reserva.', 'error');
    }
  };

  const handleClickReserve = (cls: Activity) => {
    if (!isLoggedIn) {
      navigate("/login", { state: { reserveThis: cls } });
      return;
    }
    handleReserve(cls);
  };

  useEffect(() => {
    ActivityService.getAll().then(data => {
      const now = new Date();
      const futureActivities = data.filter(c => new Date(`${c.date}T${c.start}`) >= now);

      if (!activityName) {
        setClasses(futureActivities);
        return;
      }

      const targetName = slugMap[activityName] || activityName;
      setClasses(futureActivities.filter(c => c.name.toLowerCase() === targetName.toLowerCase()));
    });
  }, [activityName]);

  useEffect(() => {
    const state = location.state as { reserveThis?: Activity } | undefined;
    if (state?.reserveThis && isLoggedIn && !hasReserved.current) {
      hasReserved.current = true;
      navigate(location.pathname, { replace: true, state: {} });
      setTimeout(() => handleReserve(state.reserveThis!), 0);
    }
  }, [isLoggedIn, location.state, location.pathname, navigate]);


  return (
    <div className="p-5 mt-20 max-w-7xl mx-auto">
      <h1 className="text-4xl font-semibold mb-12 text-center text-cyan-600">
        Clases de {displayName}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-10">
        {classes.map(cls => (
          <div
            key={cls.id}
            className={`activity-card ${cls.available > 5 ? "available" : cls.available > 0 ? "limited" : "full"
              }`}
          >
            <h2>{cls.name}</h2>
            <p>📅 {cls.date}</p>
            <p>⏰ {cls.start} - {cls.end}</p>
            <p>Disponibles: {cls.available}</p>
            <button
              className="btn-reservar"
              onClick={() => handleClickReserve(cls)}
              disabled={cls.available <= 0}
            >
              {cls.available > 0 ? "Reservar" : "Sin plazas"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityGrid;
