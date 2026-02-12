const Teachers = () => {
  return (
    <div className="flex mt-20 flex-wrap justify-center gap-6">

      <div className="profesor-card flex-1 max-w-[23%] relative overflow-hidden group">
        <img src="/src/assets/images/h1-img-24.jpg" className="profesor-img" />

        <div className="hover-info">
          <h3 className="text-white text-2xl mb-1">SAM MILLS</h3>
          <h6 className="mb-2">OUR FOUNDER</h6>
        </div>
      </div>

      <div className="profesor-card flex-1 max-w-[23%] relative overflow-hidden group">
        <img src="/src/assets/images/h1-img-25.jpg" className="profesor-img" />

        <div className="hover-info">
          <h3 className="text-white text-2xl mb-1">LYN MEYER</h3>
          <h6 className="mb-2">ACTIVITY'S MONITOR</h6>
        </div>
      </div>

      <div className="profesor-card flex-1 max-w-[23%] relative overflow-hidden group">
        <img src="/src/assets/images/h1-img-26.jpg" className="profesor-img" />

        <div className="hover-info">
          <h3 className="text-white text-2xl mb-1">TED COHEN</h3>
          <h6 className="mb-2">ACTIVITY'S MONITOR</h6>
        </div>
      </div>

      <div className="profesor-card flex-1 max-w-[23%] relative overflow-hidden group">
        <img src="/src/assets/images/h1-img-37.jpg" className="profesor-img" />

        <div className="hover-info">
          <h3 className="text-white text-2xl mb-1">SILVIA FORD</h3>
          <h6 className="mb-2">EXCURSION'S</h6>
        </div>
      </div>
    </div>
  );
};

export default Teachers;