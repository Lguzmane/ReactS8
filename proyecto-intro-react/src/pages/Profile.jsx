import React, { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, getProfile, logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Perfil del Usuario</h1>
      {user ? (
        <>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={handleLogout} style={buttonStyle}>
            Cerrar sesión
          </button>
        </>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  );
};

const buttonStyle = {
  marginTop: "20px",
  padding: "10px",
  backgroundColor: "#ff4d4d",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Profile;
