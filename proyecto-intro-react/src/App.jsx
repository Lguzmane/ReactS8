import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import { UserProvider, useUser } from "./context/UserContext.jsx";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Pizza from "./pages/Pizza";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import "./assets/App.css";

const ProtectedRoute = ({ element }) => {
  const { user } = useUser();
  return user ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<RedirectIfLoggedIn><Register /></RedirectIfLoggedIn>} />
              <Route path="/login" element={<RedirectIfLoggedIn><Login /></RedirectIfLoggedIn>} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/pizza/:pizzaId" element={<Pizza />} />
              <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

const RedirectIfLoggedIn = ({ children }) => {
  const { user } = useUser();
  return user ? <Navigate to="/" /> : children;
};

export default App;
