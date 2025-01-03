import React from "react";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, total } = useCart();
  const { user } = useUser();
  const token = localStorage.getItem("userToken");

  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cart }),
      });

      if (response.ok) {
        alert("¡Compra realizada con éxito!");
      } else {
        alert("Error al realizar la compra. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al procesar la compra:", error);
    }
  };

  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>
      {cart.length > 0 ? (
        cart.map((item) => (
          <div key={item.name} className="cart-item">
            <img src={item.img} alt={item.name} width="60" />
            <h3>{item.name}</h3>
            <p>Precio: ${item.price * item.quantity}</p>
            <div className="quantity-controls">
              <button onClick={() => decreaseQuantity(item.name)}>-</button>
              <span className="quantity">{item.quantity}</span>
              <button onClick={() => increaseQuantity(item.name)}>+</button>
            </div>
          </div>
        ))
      ) : (
        <p>Tu carrito está vacío.</p>
      )}
      <div className="cart-total-container">
        <h3>Total: ${total}</h3>
        <button
          onClick={handleCheckout}
          disabled={!user}
          style={{
            backgroundColor: user ? "green" : "gray",
            color: "white",
            padding: "10px",
            cursor: user ? "pointer" : "not-allowed",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Pagar
        </button>
      </div>
    </div>
  );
};

export default Cart;
