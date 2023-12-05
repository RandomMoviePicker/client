import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import exit from "../../../public/exit.png";
import "./topNavbar.css";

 
function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="topnavbar">
      
      {isLoggedIn && (
        <>
          
          <span>{user && user.email}</span>
          <button className="topNavbar-btn" onClick={logOutUser}><img src={exit} alt="exit"/></button>
        </>
      )}

      {!isLoggedIn && (
        <div className="login-register">
         
          <Link to="/signup">
            {" "}
            <button>Sign Up</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button>Login</button>{" "}
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
