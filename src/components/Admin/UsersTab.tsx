import type { User } from "../../types/User";

type Props = {
  usersList: User[];
  setIsEditingUser: (v: boolean) => void;
  setUserForm: (u: User) => void;
  setShowUserModal: (v: boolean) => void;
  deleteItem: (type: "users", id: string | number) => void;
  openEditUser?: (u: User) => void;
  openCreateUser?: () => void;
};

export default function UsersTab({
  usersList,
  setIsEditingUser,
  setUserForm,
  setShowUserModal,
  deleteItem,
  openEditUser,
  openCreateUser,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => {
            if (openCreateUser) {
              openCreateUser();
              return;
            }
            setIsEditingUser(false);
            setUserForm({
              id: "",
              name: "",
              email: "",
              password: "",
              role: "user",
            });
            setShowUserModal(true);
          }}
          className="bg-[#3af8f5] text-slate-800 px-8 py-4 rounded-2xl font-black text-xs uppercase shadow-xl hover:scale-105 transition-transform"
        >
          + Añadir Usuario
        </button>
      </div>

      <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
              <th className="p-8">Usuario</th>
              <th className="p-8">Rol</th>
              <th className="p-8 text-right">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {usersList.map((u) => (
              <tr key={u.id} className="hover:bg-blue-50/30 transition-colors">
                <td className="p-8 font-black text-slate-800">{u.name}</td>

                <td className="p-8">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${u.role === "admin"
                    ? "bg-purple-100 text-purple-600"
                    : u.role === "monitor"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-slate-100 text-slate-500"
                    }`}>
                    {u.role}
                  </span>
                </td>

                <td className="p-8 text-right flex justify-end gap-4 items-center">
                  <button
                    onClick={() => {
                      if (openEditUser) {
                        openEditUser(u);
                        return;
                      }
                      setIsEditingUser(true);
                      setUserForm(u);
                      setShowUserModal(true);
                    }}
                    className="text-blue-500 font-black text-[10px] uppercase hover:underline"
                  >
                    Editar
                  </button>

                  {u.role !== "admin" && (
                    <button
                      onClick={() => deleteItem("users", String(u.id))}
                      className="text-red-400 font-black text-[10px] uppercase hover:text-red-600"
                    >
                      Eliminar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
