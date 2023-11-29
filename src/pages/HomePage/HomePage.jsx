import "./HomePage.css";
import { useNavigate } from "react-router-dom";


const HomePage= () => {
  const navigate = useNavigate()
  const handleClick= () => {
    navigate("/RandomMovie")
    console.log("HI!!!")
    }
  
  return (
    <div className="the-big-button-container">
      <button onClick={handleClick} className="the-big-button" >Push!</button>
    </div>
  );
}

export default HomePage;
