const Testimonials = () => {
  return (
    <div className="flex flex-wrap bg-black py-10 px-5 mt-40 h-60">

      <div className="w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
        <h1 className="text-white text-4xl font-bold text-center">
          TESTIMONIOS
        </h1>
      </div>

      <div className="w-full md:w-1/2 relative flex justify-center items-center">
        <input type="radio" name="testimonial" id="t1" className="hidden" defaultChecked />
        <input type="radio" name="testimonial" id="t2" className="hidden" />
        <input type="radio" name="testimonial" id="t3" className="hidden" />

        <div className="testimonio-container w-full max-w-lg relative">

          <div className="testimonio t1 absolute inset-0 flex flex-col justify-center items-center text-center p-5">
            <p className="text-white text-lg">
              "Son clases súper completas, soy socia habitual y lo seguiré siendo mucho tiempo más!!!"
            </p>
            <p className="text-teal-300 mt-2 text-sm">James James, Altea</p>
          </div>

          <div className="testimonio t2 absolute inset-0 flex flex-col justify-center items-center text-center p-5">
            <p className="text-white text-lg">
              "Me encanta la forma de enseñar, siempre aprendo algo nuevo cada clase."
            </p>
            <p className="text-teal-300 mt-2 text-sm">Anna Pérez, Valencia</p>
          </div>

          <div className="testimonio t3 absolute inset-0 flex flex-col justify-center items-center text-center p-5">
            <p className="text-white text-lg">
              "Profesores muy profesionales y ambiente muy amigable."
            </p>
            <p className="text-teal-300 mt-2 text-sm">Carlos Ruiz, Madrid</p>
          </div>
        </div>

        <div className="flex flex-col ml-4 space-y-3">
          <label
            htmlFor="t1"
            className="arrow cursor-pointer text-white text-2xl hover:text-teal-300 select-none"
          >
            ▲
          </label>

          <label
            htmlFor="t2"
            className="arrow cursor-pointer text-white text-2xl hover:text-teal-300 select-none"
          >
            ▼
          </label>
        </div>

      </div>
    </div>
  );
};

export default Testimonials;