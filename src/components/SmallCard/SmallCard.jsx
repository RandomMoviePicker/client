import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { fetchPlaylists, addToSelectedPlaylist } from "../../utils/fetchAndAddFunctions";
import "./smallcard.css";

const Smallcard = ({ eachMovie, deleteFromPlaylist }) => {
    const { nameList } = useParams()
    const { user } = useContext(AuthContext);
    const [selectedPlaylist, setSelectedPlaylist] = useState("");
    const userId = user?._id
    const [playListNames, setPlayListNames] = useState([])
    const [feedbackMessage, setFeedbackMessage] = useState("")

    useEffect(() => {
        if (user) {
            fetchPlaylists(userId, setPlayListNames, nameList)
        }
       
    }, [])
   
    return (
        <div>
            <div className="movie.card" key={eachMovie._id}>
                <h1 className="title">{eachMovie.title}</h1>
                <img className="cover-img" src={eachMovie.imageUrl} alt={eachMovie.title} />
                {eachMovie.genre?.map((eachGenre, index) => {
                    return (
                        <h1 key={index}>{eachGenre}</h1>
                    )
                })}
                <p className="overview">{eachMovie.overview}</p>
                <h2 className="release">{eachMovie.releaseDate}</h2>
                <button onClick={() => addToSelectedPlaylist(eachMovie._id, "favourites",userId, setFeedbackMessage)}>♥</button>
                <button onClick={() => deleteFromPlaylist(eachMovie._id)}>🗑</button>

                <select onChange={(e) => setSelectedPlaylist(e.currentTarget.value)} name="" id="">
                    <option  >.. select playlist</option>
                    {playListNames.map((eachName, index) => {
                        return (
                            <option key={eachName + index} value={eachName} >{eachName}</option>
                        )
                    })
                    }
                </select>
                <button onClick={() => addToSelectedPlaylist(eachMovie._id, selectedPlaylist, userId, setFeedbackMessage)}>➕</button>
                {feedbackMessage && <p>{feedbackMessage}</p>}
            </div>
        </div>
    )
}

export default Smallcard