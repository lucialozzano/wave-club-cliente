import type { Dispatch, SetStateAction } from "react";
import type { User } from "../../types/User";
import { UserService } from "../../api/userService";

type Props = {
  showUserModal: boolean;
  setShowUserModal: Dispatch<SetStateAction<boolean>>;
  isEditingUser: boolean;
  userForm: User;
  setUserForm: Dispatch<SetStateAction<User>>;
  fetchData: () => void;
};

export default function UserModal({
  showUserModal,
  setShowUserModal,
  isEditingUser,
  userForm,
  setUserForm,
  fetchData,
}: Props) {
  if (!showUserModal) return null;

  const handleChange = (field: keyof User, value: string) => {
    setUserForm({ ...userForm, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const cleanId = String(userForm.id).trim();

      if (isEditingUser) {
        if (!cleanId || cleanId === "undefined") {
          throw new Error("ID de usuario no válido");
        }

        const { id, ...userDataWithoutId } = userForm;

        await UserService.update(cleanId, {
          ...userDataWithoutId,
          id: cleanId
        });

      } else {
        const allUsers = await UserService.getAll();
        const nextId = allUsers.length > 0
          ? Math.max(...allUsers.map(u => Number(u.id))) + 1
          : 1;

        const newUser = {
          ...userForm,
          id: String(nextId)
        };

        await UserService.create(newUser);
      }

      setShowUserModal(false);
      fetchData();
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      alert("Hubo un problema al guardar el usuario.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-10 rounded-3xl w-[520px] shadow-xl">
        <h2 className="text-xl font-black mb-6">
          {isEditingUser ? "Editar usuario" : "Crear usuario"}
        </h2>

        <input
          placeholder="Nombre"
          value={userForm.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full border p-3 rounded-xl mb-3"
        />

        <input
          placeholder="Email"
          value={userForm.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-full border p-3 rounded-xl mb-3"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={userForm.password}
          onChange={(e) => handleChange("password", e.target.value)}
          className="w-full border p-3 rounded-xl mb-3"
        />

        <select
          value={userForm.role}
          onChange={(e) => handleChange("role", e.target.value as "user" | "admin" | "monitor")}
          className="w-full border p-3 rounded-xl mb-6"
        >
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
          <option value="monitor">Monitor</option>

        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowUserModal(false)}
            className="px-5 py-2 border rounded-xl"
          >
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-[#3af8f5] rounded-xl font-black"
          >
            {isEditingUser ? "Guardar cambios" : "Crear"}
          </button>
        </div>
      </div>
    </div>
  )
}
