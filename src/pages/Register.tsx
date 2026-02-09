import { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/User";


const Register = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Por favor, rellena todos los campos");
      return;
    }

    try {
      const resUsers = await fetch("http://localhost:3001/users");
      const allUsers: User[] = await resUsers.json();

      const nextIdNumeric = allUsers.length > 0
        ? Math.max(...allUsers.map((u) => {
          const parsed = parseInt(u.id.toString());
          return isNaN(parsed) ? 0 : parsed;
        })) + 1
        : 1;

      const nextId = String(nextIdNumeric);

      const userData = {
        id: nextId,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password
      };

      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const newUser: User = await response.json();

        login(newUser);

        alert(`¡Bienvenid@ ${newUser.name}!`);
        navigate("/");
      } else {
        alert("Error al guardar en el servidor.");
      }
    } catch (error) {
      console.error("Error detallado:", error);
      alert("Error de conexión.");
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cyan-50">
      <div className="p-10 bg-white rounded-xl shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-cyan-700 text-center">Registrarse</h1>

        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-black"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-black"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-black"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-black text-white font-bold py-3 rounded hover:bg-cyan-600 transition"
        >
          Crear cuenta
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-cyan-600 font-semibold hover:underline"
          >
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
