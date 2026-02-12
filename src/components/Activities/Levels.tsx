const Levels = () => {
  return (
    <>
      <div className="mt-10 pt-5 text-center mx-5">
        <h2 className="text-3xl font-semibold">
          CLASES PARA TODOS LOS NIVELES
        </h2>
      </div>

      <div className="flex flex-wrap justify-center my-12 gap-6">

        <div className="w-5/12 sm:w-1/4 lg:w-2/12 flex flex-col items-center text-center">
          <img src="/src/assets/images/h1-img-33.png" className="w-40 mb-2" />
          <h4 className="text-base font-bold mt-3">¡HEY, PEQUES!</h4>
          <p className="text-gray-400 text-sm mt-2 mx-1">
            Diversión y aprendizaje en nuestras clases seguras para niños
          </p>
        </div>

        <div className="w-5/12 sm:w-1/4 lg:w-2/12 flex flex-col items-center text-center">
          <img src="/src/assets/images/h1-img-34.png" className="w-40 mb-2" />
          <h4 className="text-base font-bold mt-3">CONTAMOS CON TODOS</h4>
          <p className="text-gray-400 text-sm mt-2 mx-1">
            Clases inclusivas adaptadas para todos
          </p>
        </div>

        <div className="w-5/12 sm:w-1/4 lg:w-2/12 flex flex-col items-center text-center">
          <img src="/src/assets/images/h1-img-35.png" className="w-40 mb-2" />
          <h4 className="text-base font-bold mt-3">BIENVENID@ AL CLUB</h4>
          <p className="text-gray-400 text-sm mt-2 mx-1">
            Aprende desde cero en un entorno seguro
          </p>
        </div>

        <div className="w-5/12 sm:w-1/4 lg:w-2/12 flex flex-col items-center text-center">
          <img src="/src/assets/images/h1-img-36.png" className="w-40 mb-2" />
          <h4 className="text-base font-bold mt-3">
            CONFIANDO EN NUESTRO CLUB
          </h4>
          <p className="text-gray-400 text-sm mt-2 mx-1">
            Entrenamientos intensivos
          </p>
        </div>

      </div>
    </>
  );
};

export default Levels;