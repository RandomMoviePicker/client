import "./playlistsForm.css";
import {useState, useContext} from "react";
import { AuthContext } from "../../context/auth.context";
const URL = import.meta.env.VITE_SERVER_URL;


const PlaylistsForm = () => {
  const { user } = useContext(AuthContext);
  const userId = user._id;
  const [name , setName] = useState("");

const handleInputChange = (event) =>{
  const currentValue = event.target.value;
  setName(currentValue);
}
const handleFormSubmit = async(event) =>{
  event.preventDefault();
  try{
    await fetch(URL + "/playlists/create", {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify({name, userId})

    })
  }
  catch(error){
    console.log(error)
  }
}


  return (
    <form onSubmit={(event)=>handleFormSubmit(event)} className="playlistForm">
        
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={(event) => handleInputChange(event)} />

        <button type="submit">Create playlist</button>
      </form>
  );
}

export default PlaylistsForm;
