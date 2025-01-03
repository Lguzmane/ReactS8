import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    const storedEmail = localStorage.getItem("userEmail");
    if (storedToken && storedEmail) {
      setUser({ email: storedEmail });
      setToken(storedToken);
    }
  }, []);

  // Método de Login
  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.token) {
        setUser({ email });
        setToken(data.token);
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userEmail", email);
      } else {
        alert(data.error || "Error en las credenciales.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  // Método de Register
  const register = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.token) {
        setUser({ email });
        setToken(data.token);
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userEmail", email);
      } else {
        alert("Error al registrarse.");
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };

  // Método de Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");
  };

  // Método para obtener el perfil
  const getProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.email) {
        setUser({ email: data.email });
      }
    } catch (error) {
      console.error("Error al obtener el perfil:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout, getProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
