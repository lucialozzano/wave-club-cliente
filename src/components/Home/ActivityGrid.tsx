import { Link } from "react-router-dom";

const ActivitiesGrid: React.FC = () => {
  return (
    <section className="grid mb-5 grid-cols-1 lg:grid-cols-2 gap-8 px-5 md:px-20 mt-16">

      <Link
        to="/activities"
        className="relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 ease-out hover:-translate-y-4 hover:shadow-2xl group"
      >
        <img
          src="/src/assets/images/lan-home-img-1.jpg"
          className="w-full transition-transform duration-500 ease-out group-hover:scale-105"
          alt="Actividades"
        />
        <span className="absolute top-2 left-2 text-[90px] font-dafoe text-gray-300 z-0">
          01
        </span>
        <div className="absolute bottom-4 left-4 text-white z-10">
          <h3 className="text-xl font-semibold">
            <span className="mr-1">01</span>ACTIVIDADES
          </h3>
        </div>
      </Link>

      <div className="relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 ease-out hover:-translate-y-4 hover:shadow-2xl group">
        <img
          src="/src/assets/images/lan-home-img-2.jpg"
          className="w-full transition-transform duration-500 ease-out group-hover:scale-105"
          alt="Excursiones"
        />
        <span className="absolute top-2 left-2 text-[90px] font-dafoe text-gray-300 z-0">
          02
        </span>
        <div className="absolute bottom-4 left-4 text-white z-10">
          <h3 className="text-xl font-semibold">
            <span className="mr-1">02</span>EXCURSIONES
          </h3>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 ease-out hover:-translate-y-4 hover:shadow-2xl group">
        <img
          src="/src/assets/images/lan-home-img-3.jpg"
          className="w-full transition-transform duration-500 ease-out group-hover:scale-105"
          alt="Merchandising"
        />
        <span className="absolute top-2 left-2 text-[90px] font-dafoe text-gray-300 z-0">
          03
        </span>
        <div className="absolute bottom-4 left-4 text-black z-10">
          <h3 className="text-xl font-semibold">
            <span className="mr-1">03</span>MERCHANDISING
          </h3>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 ease-out hover:-translate-y-4 hover:shadow-2xl group">
        <img
          src="/src/assets/images/lan-home-img-4.jpg"
          className="w-full transition-transform duration-500 ease-out group-hover:scale-105"
          alt="Live Summer"
        />
        <span className="absolute top-2 left-2 text-[90px] font-dafoe text-gray-300 z-0">
          04
        </span>
        <div className="absolute bottom-4 left-4 text-black z-10">
          <h3 className="text-xl font-semibold">
            <span className="mr-1">04</span>LIVE SUMMER
          </h3>
        </div>
      </div>

    </section>
  );
};

export default ActivitiesGrid;