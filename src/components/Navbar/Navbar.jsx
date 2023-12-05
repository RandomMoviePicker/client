import "./Navbar.css";
import { Link } from "react-router-dom";
import home from "../../../public/home.png";
import tv from "../../../public/tv.png";
import select from "../../../public/select.png";
import add from "../../../public/agregar.png";


function Navbar() {

  return (

    <nav className="navbar">
      <Link to="/" >
        <div className="icon-box">
          <img src={home} alt="Home icon" />
          <h4>Home</h4>
        </div>
      </Link>

      <Link to="/allPlaylists">
        <div className="icon-box">
          <img src={tv} alt="Television icon" />
          <h4>My lists</h4>
        </div>
      </Link>

      <Link to="/filters">
        <div className="icon-box">
          <img src={select} alt="Choice icon" />
          <h4>Filter</h4>
        </div>
      </Link>

      <Link to="/playlists">
        <div className="icon-box">
          <img src={add} alt="Add icon" />
          <h4>New List</h4>
        </div>
      </Link>

    </nav>

  );
}

export default Navbar;
