import "./playlistsForm.css";
import {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
const URL = import.meta.env.VITE_SERVER_URL;


const PlaylistsForm = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext);
  const userId = user._id;
  const [name , setName] = useState("")
  const [errorMessage, setErrorMessage] = useState(undefined);


const handleInputChange = (event) =>{
  const currentValue = event.target.value;
  setName(currentValue);
}
const handleFormSubmit = async(event) =>{
  event.preventDefault();


  try{
      const res = await fetch(URL + "/playlists/create", {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify({name, userId})
      
    });
    if (res.status === 200){
      navigate("/allPlaylists")
    }
    else{
      let errorsms = await res.json()
      setErrorMessage(errorsms.message)
      setTimeout(()=>{
        setErrorMessage("");
    },2000)
    }
  }
  catch(error){
    console.error(error)
    setErrorMessage(error.response)
    
  }
}


  return (
    <div className="signup-container">
    <div className="form-box">
    {errorMessage ? <h1 className="error-text">{errorMessage}</h1>:<h1 className="error-text">Choose a name for your new list</h1>}
    <form onSubmit={(event)=>handleFormSubmit(event)} className="playlistForm">
        
        <label htmlFor="name">Name:</label>
        <input className="input" type="text" id="name" name="name" value={name} onChange={(event) => handleInputChange(event)} />

        <button className="button center" type="submit">Create playlist</button>
      </form>
      </div>
      </div>
  );
}

export default PlaylistsForm;
