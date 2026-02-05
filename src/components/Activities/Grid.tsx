//`pnerlo con tabla activities
const Grid = () => {
  return (
    <div className="flex flex-wrap justify-center">

      <div className="w-full sm:w-1/2 lg:w-1/4 p-2 relative overflow-hidden">
        <img
          src="/src/assets/images/actividades-natacion.jpg"
          alt="Natación"
          className="w-full h-80 object-cover"
        />
        <h2 className="absolute bottom-4 left-4 text-black tracking-widest text-xl">
          NATACIÓN
        </h2>
      </div>

      <div className="w-full sm:w-1/2 lg:w-1/4 p-2 relative overflow-hidden">
        <img
          src="/src/assets/images/actividades-piraguismo.jpg"
          alt="Piragüismo"
          className="w-full h-80 object-cover"
        />
        <h2 className="absolute bottom-4 left-4 text-white tracking-widest text-xl">
          PIRAGÜISMO
        </h2>
      </div>

      <div className="w-full sm:w-1/2 lg:w-1/4 p-2 relative overflow-hidden">
        <img
          src="/src/assets/images/actividades-surf.jpg"
          alt="Surf"
          className="w-full h-80 object-cover"
        />
        <h2 className="absolute bottom-4 left-4 text-white tracking-widest text-xl">
          SURF
        </h2>
      </div>

      <div className="w-full sm:w-1/2 lg:w-1/4 p-2 relative overflow-hidden">
        <img
          src="/src/assets/images/actividades-windsurf.jpg"
          alt="Windsurf"
          className="w-full h-80 object-cover"
        />
        <h2 className="absolute bottom-4 left-4 text-black tracking-widest text-xl">
          WINDSURF
        </h2>
      </div>

    </div>
  );
};

export default Grid;