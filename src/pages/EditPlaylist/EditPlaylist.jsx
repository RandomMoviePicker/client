import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const URL = import.meta.env.VITE_SERVER_URL;


const EditPlaylist = () =>{
    const navigate = useNavigate();
    const {playlistId, oldName} = useParams();
    const [name , setName] = useState(oldName);
    const [errorMessage, setErrorMessage] = useState(undefined);
  

    console.log(name,playlistId)

  const handleInputChange = (event) =>{
    const currentValue = event.target.value;
    setName(currentValue);
  }
  const handleEditFormSubmit = async(event) =>{
    event.preventDefault();
  
    try{
        const res = await fetch(URL + "/playlists/edit", {
        method: "PUT",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify({name, playlistId})
        
      });
      if (res.status === 200){
        navigate("/allPlaylists")
      }
      /*else{
        let errorsms = await res.json()
        setErrorMessage(errorsms.message)
      }*/
    }
    catch(error){
      console.error(error)
      setErrorMessage(error.response)
    }
  }

    return(
<>
    {errorMessage && <h1>{errorMessage}</h1>}
    <form onSubmit={(event)=>handleEditFormSubmit(event)} className="playlistForm">
        
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={(event) => handleInputChange(event)} />

        <button type="submit">Edit playlist</button>
      </form>
      </>
    )
}
export default EditPlaylist;