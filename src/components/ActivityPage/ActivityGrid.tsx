import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Clase {
  id: number;
  name: string;
  description: string;
  date: string; // "YYYY-MM-DD"
  start: string;
  end: string;
  available: number;
  level?: "Principiante" | "Intermedio" | "Avanzado";
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

  const displayName = activityName
    ? slugMap[activityName] || activityName
    : "";

  useEffect(() => {
    fetch("/api/db.json")
      .then((res) => res.json())
      .then((data) => {
        const targetName = slugMap[activityName || ""] || "";

        // Fecha de hoy (sin tiempo)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const filtered = data.activities.filter((c: Clase) => {
          // Convertimos la fecha de la actividad a Date
          const activityDate = new Date(c.date);
          activityDate.setHours(0, 0, 0, 0);

          return c.name === targetName && activityDate >= today;
        });

        const withLevels = filtered.map((cls) => ({
          ...cls,
          level: ["Principiante", "Intermedio", "Avanzado"][
            Math.floor(Math.random() * 3)
          ] as "Principiante" | "Intermedio" | "Avanzado",
        }));

        setClasses(withLevels);
      });
  }, [activityName]);

  const getLevelClass = (level?: string) => {
    switch (level) {
      case "Principiante": return "level-principiante";
      case "Intermedio": return "level-intermedio";
      case "Avanzado": return "level-avanzado";
      default: return "level-principiante";
    }
  };

  return (
    <div className="p-5 mt-20 max-w-7xl">
      <h1 className="text-4xl font-semibold mb-12 text-center text-cyan-600">
        Clases de {displayName}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {classes.map((cls) => (
          <div key={cls.id} className="activity-card p-6">
            {cls.level && (
              <span className={`activity-level ${getLevelClass(cls.level)}`}>
                {cls.level}
              </span>
            )}

            <h2 className="text-2xl font-bold mb-3 text-cyan-700">
              {cls.name}
            </h2>

            <p className="text-gray-700 mb-4">{cls.description}</p>

            <p className="text-gray-600 mb-1">📅 {cls.date}</p>
            <p className="text-gray-600 mb-3">⏰ {cls.start} - {cls.end}</p>
            <p className="text-gray-600 mb-4 font-semibold">
              Disponibles: {cls.available}
            </p>

            <button className="btn-reservar">Reservar</button>
          </div>
        ))}

        {classes.length === 0 && (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No hay clases disponibles para esta actividad.
          </p>
        )}
      </div>
    </div>
  );
};

export default ActivityGrid;