import React, { createContext, useContext, useState } from "react";

// Crear el contexto
const CartContext = createContext();

// Proveedor del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para agregar una pizza al carrito
  const addToCart = (pizza) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === pizza.name);
      if (existingItem) {
        return prevCart.map((item) =>
          item.name === pizza.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...pizza, quantity: 1 }];
      }
    });
  };

  // Función para aumentar cantidad
  const increaseQuantity = (name) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Función para disminuir cantidad y eliminar si es 0
  const decreaseQuantity = (name) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.name === name ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Calcular total del carrito
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increaseQuantity, decreaseQuantity, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el carrito
export const useCart = () => useContext(CartContext);
