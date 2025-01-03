import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Pizza = ({ addToCart }) => {
  const { pizzaId } = useParams(); // Obtener el parámetro de la URL
  const [pizza, setPizza] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/pizzas/${pizzaId}`)
      .then((res) => res.json())
      .then((data) => setPizza(data))
      .catch((error) => console.error("Error al cargar la pizza:", error));
  }, [pizzaId]);

  return (
    <div>
      {pizza ? (
        <div>
          <h2>{pizza.name}</h2>
          <img src={pizza.img} alt={pizza.name} />
          <p><strong>Precio:</strong> ${pizza.price}</p>
          <p><strong>Ingredientes:</strong> {pizza.ingredients.join(", ")}</p>
          <p><strong>Descripción:</strong> {pizza.desc}</p>
          <button onClick={() => addToCart(pizza)}>Añadir al carrito</button>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default Pizza;
