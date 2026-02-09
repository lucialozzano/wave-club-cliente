import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useUser } from "../../context/UserContext";

interface Clase {
  id: number;
  name: string;
  description: string;
  date: string;
  start: string;
  end: string;
  available: number;
}

interface Reserva {
  id: number | string;
}

const slugMap: Record<string, string> = {
  surf: "Surf",
  windsurf: "Windsurf",
  piraguismo: "Piragüismo",
  natacion: "Natación en aguas abiertas",
};

const ActivityGrid = () => {
  const { activityName } = useParams<{ activityName: string }>();
  const [classes, setClasses] = useState<Clase[]>([]);
  const { isLoggedIn, userId } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const hasReserved = useRef(false);

  const displayName = activityName ? slugMap[activityName] || activityName : "";

  async function handleReserve(cls: Clase) {
    if (cls.available <= 0) return;

    const ok = window.confirm(`¿Reservar ${cls.name} el ${cls.date} a las ${cls.start}?`);
    if (!ok) return;

    try {
      const resResv = await fetch("http://localhost:3001/reservations");
      const allResv: Reserva[] = await resResv.json();

      const nextResvIdNumeric = allResv.length > 0
        ? Math.max(...allResv.map((r) => {
          const parsed = parseInt(r.id.toString());
          return isNaN(parsed) ? 0 : parsed;
        })) + 1
        : 1;

      const nextResvId = String(nextResvIdNumeric);

      await fetch("http://localhost:3001/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: nextResvId,
          userId,
          activityId: cls.id,
          date: cls.date,
          start: cls.start
        }),
      });

      await fetch(`http://localhost:3001/activities/${cls.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...cls, available: cls.available - 1 }),
      });

      setClasses((prev) =>
        prev.map((c) => (c.id === cls.id ? { ...c, available: c.available - 1 } : c))
      );

      alert("Reserva creada con éxito ✅");
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema con la reserva.");
    }
  }

  useEffect(() => {
    fetch("http://localhost:3001/activities")
      .then((res) => res.json())
      .then((data) => {
        const now = new Date();
        const futureActivities = data.filter((c: Clase) => {
          const activityDateTime = new Date(`${c.date}T${c.start}`);
          return activityDateTime >= now;
        });

        if (!activityName) {
          setClasses(futureActivities);
          return;
        }

        const targetName = slugMap[activityName] || activityName;
        setClasses(futureActivities.filter(c => c.name.toLowerCase() === targetName.toLowerCase()));
      });
  }, [activityName]);

  useEffect(() => {
    const state = location.state as { reserveThis?: Clase } | undefined;
    if (state?.reserveThis && isLoggedIn && !hasReserved.current) {
      hasReserved.current = true;
      navigate(location.pathname, { replace: true, state: {} });
      setTimeout(() => handleReserve(state.reserveThis!), 0);
    }
  }, [isLoggedIn, location.state, location.pathname, navigate]);

  const handleClickReserve = (cls: Clase) => {
    if (!isLoggedIn) {
      navigate("/login", { state: { reserveThis: cls } });
      return;
    }
    handleReserve(cls);
  };

  return (
    <div className="p-5 mt-20 max-w-7xl mx-auto">
      <h1 className="text-4xl font-semibold mb-12 text-center text-cyan-600">Clases de {displayName}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-10">
        {classes.map((cls) => (
          <div key={cls.id} className={`activity-card ${cls.available > 5 ? "available" : cls.available > 0 ? "limited" : "full"}`}>
            <h2>{cls.name}</h2>
            <p>📅 {cls.date}</p>
            <p>⏰ {cls.start} - {cls.end}</p>
            <p>Disponibles: {cls.available}</p>
            <button className="btn-reservar" onClick={() => handleClickReserve(cls)} disabled={cls.available <= 0}>
              {cls.available > 0 ? "Reservar" : "Sin plazas"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityGrid;
