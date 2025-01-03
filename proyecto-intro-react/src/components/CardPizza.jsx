import React from "react";
import { useNavigate } from "react-router-dom";

const CardPizza = ({ name, price, ingredients, img, addToCart, id }) => {
  const navigate = useNavigate(); // Hook para navegar entre rutas

  // Capitalizar la primera letra del nombre
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  return (
    <div className="card">
      {/* Imagen de la pizza */}
      <img src={img} alt={formattedName} />

      {/* Título y precio */}
      <h2>{formattedName}</h2>
      <p><strong>Precio:</strong> ${price}</p>

      {/* Lista de ingredientes */}
      <p><strong>Ingredientes:</strong></p>
      <ul>
        {Array.isArray(ingredients) ? (
          ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))
        ) : (
          <li>No hay ingredientes disponibles</li>
        )}
      </ul>

      {/* Botones */}
      <button onClick={() => navigate(`/pizza/${id}`)}>Ver más</button> {/* Navegación a la página de detalles */}
      <button onClick={() => addToCart({ name, price, img })}>Añadir</button>
    </div>
  );
};

export default CardPizza;
