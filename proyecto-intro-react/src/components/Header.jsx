import HeaderImage from '../assets/Header.jpg';

const Header = () => {
  return (
    <div className="header">
      <img src={HeaderImage} alt="Cabecera" className="header-image" />
      <div className="header-text">
        <h1>¡Pizzería Mamma Mía!</h1>
        <p>Tenemos las mejores pizzas que podrás encontrar</p>
      </div>
    </div>
  );
};

export default Header;
