import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import Header from "../components/Header";
import CardPizza from "../components/CardPizza";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const { addToCart } = useCart(); // Usar el contexto
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/pizzas")
      .then((res) => res.json())
      .then((data) => setPizzas(data))
      .catch((error) => console.error("Error al cargar pizzas:", error));
  }, []);

  return (
    <div>
      <Header />
      <div className="card-container">
        {pizzas?.map((pizza) => (
          <CardPizza
            key={pizza.id}
            id={pizza.id}
            name={pizza.name}
            price={pizza.price}
            img={pizza.img}
            ingredients={pizza.ingredients}
            addToCart={() => addToCart(pizza)} // Usar función del contexto
            onViewMore={() => navigate(`/pizza/${pizza.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
