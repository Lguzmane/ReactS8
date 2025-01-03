import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

function Navbar() {
  const { total } = useCart();
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header>
      <h1>Pizzería Mamma Mía!</h1>
      <nav>
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/profile">Perfil</Link>
            <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        <span
          className="cart-total"
          style={{ cursor: "pointer", marginLeft: "10px" }}
          onClick={() => navigate("/cart")}
        >
          🛒 Total: ${total}
        </span>
      </nav>
    </header>
  );
}

export default Navbar;
