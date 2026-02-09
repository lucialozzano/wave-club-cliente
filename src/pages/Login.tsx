import { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import users from "../../api/db.json";
import type { Activity } from "../types/Activity";

const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = users.users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("Email o contraseña incorrectos");
      return;
    }

    login(user.id, user.name); 

    const state = location.state as { reserveThis?: Activity } | undefined;

    if (state?.reserveThis) {
      navigate(`/activities/${state.reserveThis.name.toLowerCase()}`, {
        replace: true,
        state: { reserveThis: state.reserveThis }
      });
    } else {
      navigate("/", { replace: true });
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cyan-50">
      <div className="p-10 bg-white rounded-xl shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-cyan-700 text-center">
          Iniciar sesión
        </h1>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white font-bold py-3 rounded hover:bg-cyan-600 transition"
        >
          Entrar
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            className="text-cyan-600 font-semibold hover:underline"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
