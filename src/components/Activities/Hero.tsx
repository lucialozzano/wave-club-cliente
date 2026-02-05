const Hero = () => {
  return (
    <div className="relative w-full h-[500px] md:h-[550px] lg:h-[600px] xl:h-[650px]">
      <img
        src="/src/assets/images/h1-rev-background-img.jpg"
        alt="Fondo"
        className="w-full h-full object-cover"
      />

      <img
        src="/src/assets/images/loogoooooo.png"
        alt="Logo"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          w-32 md:w-36 lg:w-40 xl:w-44"
      />
    </div>
  );
};

export default Hero;