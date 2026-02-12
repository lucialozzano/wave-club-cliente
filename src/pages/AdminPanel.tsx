import { useEffect, useState, useCallback } from "react";
import { useUser } from "../context/UserContext";
import Header from "../components/Activities/Header";
import type { Activity } from "../types/Activity";
import type { User } from "../types/User";
import { Navigate } from "react-router-dom";
import type { Reservation } from "../types/Reservation";
import ActivitiesTab from "../components/Admin/ActivitiesTab";
import UsersTab from "../components/Admin/UsersTab";
import ReservationsTab from "../components/Admin/ReservationsTab";
import ActivityModal from "../components/Admin/ActivityModal";
import UserModal from "../components/Admin/UserModal";
import "../styles/admin.css";

import { ActivityService } from "../api/activityService";
import { UserService } from "../api/userService";
import { ReservationService } from "../api/reservationService";

const AdminPanel = () => {
  const { userRole, isLoggedIn } = useUser();
  const [tab, setTab] = useState<"activities" | "users" | "reservations">("activities");

  const [activities, setActivities] = useState<Activity[]>([]);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);

  const [showUserModal, setShowUserModal] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [userForm, setUserForm] = useState<User>({
    id: 0,
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [formData, setFormData] = useState<Activity>({
    id: 0,
    name: "Surf",
    description: "",
    date: "",
    start: "",
    end: "",
    available: 20,
  });

  const fetchData = useCallback(async () => {
    try {
      const [activitiesData, usersData, reservationsData] = await Promise.all([
        ActivityService.getAll(),
        UserService.getAll(),
        ReservationService.getAll(),
      ]);
      setActivities(activitiesData);
      setUsersList(usersData);
      setReservations(reservationsData);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && userRole === "admin") {
      const loadData = async () => {
        await fetchData();
      };
      loadData();
    }
  }, [isLoggedIn, userRole, fetchData]);

  if (!isLoggedIn || userRole !== "admin") return <Navigate to="/" replace />;

  const deleteItem = async (type: "activities" | "users" | "reservations", id: string | number) => {
    if (!confirm("¿Eliminar registro?")) return;

    try {
      if (type === "activities") await ActivityService.delete(id);
      if (type === "users") await UserService.delete(id);
      if (type === "reservations") await ReservationService.delete(id);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const openEditActivity = (act: Activity) => {
    setFormData({ ...act });
    setCurrentId(act.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const openCreateActivity = () => {
    setFormData({
      id: 0,
      name: "Surf",
      description: "",
      date: "",
      start: "",
      end: "",
      available: 20,
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const openEditUser = (u: User) => {
    setUserForm({ ...u });
    setIsEditingUser(true);
    setShowUserModal(true);
  };

  const openCreateUser = () => {
    setUserForm({
      id: 0,
      name: "",
      email: "",
      password: "",
      role: "user",
    });
    setIsEditingUser(false);
    setShowUserModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="max-w-6xl mx-auto py-12 px-10">
        <div className="flex justify-center mb-10">
          <div className="bg-slate-200/50 p-2 rounded-3xl border border-slate-200 inline-flex">
            {(["activities", "users", "reservations"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-10 py-3 rounded-2xl text-sm font-black transition-all ${tab === t
                  ? "bg-slate-800 text-[#3af8f5] shadow-lg"
                  : "text-slate-500 hover:text-slate-800"
                  }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {tab === "activities" && (
          <ActivitiesTab
            activities={activities}
            openCreate={openCreateActivity}
            openEdit={openEditActivity}
            deleteItem={deleteItem}
          />
        )}

        {tab === "users" && (
          <UsersTab
            usersList={usersList}
            setIsEditingUser={setIsEditingUser}
            setUserForm={setUserForm}
            setShowUserModal={setShowUserModal}
            deleteItem={deleteItem}
            openEditUser={openEditUser}
            openCreateUser={openCreateUser}
          />
        )}

        {tab === "reservations" && (
          <ReservationsTab
            reservations={reservations}
            activities={activities}
            usersList={usersList}
            deleteItem={deleteItem}
          />
        )}
      </div>

      {showModal && (
        <ActivityModal
          showModal={showModal}
          setShowModal={setShowModal}
          isEditing={isEditing}
          formData={formData}
          setFormData={setFormData}
          currentId={currentId}
          fetchData={fetchData}
        />
      )}

      {showUserModal && (
        <UserModal
          showUserModal={showUserModal}
          setShowUserModal={setShowUserModal}
          isEditingUser={isEditingUser}
          userForm={userForm}
          setUserForm={setUserForm}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default AdminPanel;
