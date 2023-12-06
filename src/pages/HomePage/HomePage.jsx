import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./HomePage.css";

const URL = import.meta.env.VITE_SERVER_URL

const HomePage = (props) => {
  const navigate = useNavigate();
  const getMovies = async () => {
    try {
      const response = await fetch(URL + "/movies/randomMovie")
      const responseJson = await response.json()
      props.setRandom(responseJson[0])
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getMovies()
  }, [])

  const handleClick = () => {
    navigate("/randomMovie")
  }

  return (
    <div className="flex-container-homepage">
      <div className="the-big-button-container">
        <button onClick={handleClick} className="the-big-button" >PUSH ME !</button>
      </div>

    </div>
  );
}

export default HomePage;
