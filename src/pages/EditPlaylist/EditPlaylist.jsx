import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import "./editPlaylist.css";

const URL = import.meta.env.VITE_SERVER_URL;

const EditPlaylist = () => {
  const navigate = useNavigate();
  const { playlistId, oldName } = useParams();
  const [name, setName] = useState(oldName);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { user } = useContext(AuthContext);
  const userId = user._id;

  const handleInputChange = (event) => {
    const currentValue = event.target.value;
    setName(currentValue);
  }
  const handleEditFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(URL + "/playlists/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, playlistId, userId })

      });
      if (res.status === 200) {
        navigate("/allPlaylists")
      }
      else {
        let errorsms = await res.json()
        setErrorMessage(errorsms.message)
      }
    }
    catch (error) {
      console.error(error)
      setErrorMessage(error.response)
    }
  }

  return (
    <div className="signup-container">
      <div className="form-box">
        {errorMessage && <h1>{errorMessage}</h1>}
        <form onSubmit={(event) => handleEditFormSubmit(event)} className="playlistForm">
          <label htmlFor="name">Name:</label>
          <input className="input" type="text" id="name" name="name" value={name} onChange={(event) => handleInputChange(event)} />
          <button className="button center" type="submit">Edit playlist</button>
        </form>
      </div>
    </div>
  )
}

export default EditPlaylist;