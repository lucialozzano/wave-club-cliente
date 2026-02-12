const Header: React.FC = () => {
  return (
    <header
      className="wave-container relative bg-cover bg-center"
      style={{ backgroundImage: "url('/src/assets/images/lan-rev-img.jpg')" }}
    >
      <div className="flex flex-wrap justify-between items-start px-5 py-6">

        <div className="flex justify-center md:justify-start w-full md:w-1/2">
          <img
            src="/src/assets/images/loogoooooo.png"
            alt="Logo"
            className="w-56 md:w-72 h-auto md:mt-6"
          />
        </div>



      </div>
    </header>
  );
};

export default Header;