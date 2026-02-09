import { useUser } from "../../context/UserContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { userName, isLoggedIn, logout } = useUser();

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        <ul className="hidden md:flex items-center gap-8">
          {["Eventos", "Contáctanos", "Merchandising", "Blog"].map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} className="text-gray-600 font-medium hover:text-cyan-500 transition-colors">
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-5">
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Bienvenid@</span>
                <span className="text-gray-800 font-bold">{userName}</span>
              </div>
              
              <button
                onClick={logout}
                className="bg-red-50 text-red-500 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-500 hover:text-white transition-all"
              >
                Salir
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-cyan-600 transition-all shadow-md"
            >
              Inicia sesión
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
