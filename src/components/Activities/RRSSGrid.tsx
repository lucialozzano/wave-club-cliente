const RRSSGrid = () => {
  return (
    <div className="mt-20 w-full flex flex-wrap">

      <div className="relative group flex-1 min-w-[80px]">
        <img
          src="/src/assets/images/81886003_481693189398009_4745791933860630342_n.jpg"
          className="w-full h-auto object-cover cursor-pointer"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-teal-400 w-14 h-14 rounded-full flex items-center justify-center opacity-0 scale-0 transition-transform duration-300 group-hover:opacity-100 group-hover:scale-100">
            <img src="/src/assets/instagram.svg" className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="relative group flex-1 min-w-[80px] hidden md:flex">
        <img
          src="/src/assets/images/82064476_612488832880643_2680891047602672692_n.jpg"
          className="w-full h-auto object-cover cursor-pointer"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-teal-400 w-14 h-14 rounded-full flex items-center justify-center opacity-0 scale-0 transition-transform duration-300 group-hover:opacity-100 group-hover:scale-100">
            <img src="/src/assets/instagram.svg" className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="relative group flex-1 min-w-[80px] hidden md:flex">
        <img
          src="/src/assets/images/80129498_526270191324871_1571444351515263827_n.jpg"
          className="w-full h-auto object-cover cursor-pointer"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-teal-400 w-14 h-14 rounded-full flex items-center justify-center opacity-0 scale-0 transition-transform duration-300 group-hover:opacity-100 group-hover:scale-100">
            <img src="/src/assets/instagram.svg" className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="relative group flex-1 min-w-[80px] hidden md:flex">
        <img
          src="/src/assets/images/80104300_468681540740905_4543565925474900140_n.jpg"
          className="w-full h-auto object-cover cursor-pointer"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-teal-400 w-14 h-14 rounded-full flex items-center justify-center opacity-0 scale-0 transition-transform duration-300 group-hover:opacity-100 group-hover:scale-100">
            <img src="/src/assets/instagram.svg" className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="relative group flex-1 min-w-[80px] hidden lg:flex">
        <img
          src="/src/assets/images/81042590_504703443502700_1922153452980777843_n.jpg"
          className="w-full h-auto object-cover cursor-pointer"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-teal-400 w-14 h-14 rounded-full flex items-center justify-center opacity-0 scale-0 transition-transform duration-300 group-hover:opacity-100 group-hover:scale-100">
            <img src="/src/assets/instagram.svg" className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="relative group flex-1 min-w-[80px] hidden lg:flex">
        <img
          src="/src/assets/images/80577045_171637014213272_6076270603820114291_n.jpg"
          className="w-full h-auto object-cover cursor-pointer"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-teal-400 w-14 h-14 rounded-full flex items-center justify-center opacity-0 scale-0 transition-transform duration-300 group-hover:opacity-100 group-hover:scale-100">
            <img src="/src/assets/instagram.svg" className="w-6 h-6" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default RRSSGrid;