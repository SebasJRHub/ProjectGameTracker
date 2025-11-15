import { Link } from "react-router-dom";
import "../Styles/Navbar.css";
import logo from "../assets/Tokyo ghoul.jpg"; 
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="GamerTrack Logo" className="logo-img" />
        <h1>GamerZone</h1>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/bibliotecaJuegos">Biblioteca</Link></li>
        <li><Link to="/login"><button className="btn-logout"onClick={handleLogout}>Cerrar sesión</button></Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
