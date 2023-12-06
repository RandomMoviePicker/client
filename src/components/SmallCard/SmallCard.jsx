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
    const [toggleDescription, setToggleDescription] = useState(false)

    useEffect(() => {
        if (user) {
            fetchPlaylists(userId, setPlayListNames, nameList)
        }
    }, [])

    const handleClick = () => {
        setToggleDescription(!toggleDescription)
    }
    return (
        <div className="small-cards-container">
            <div className="small-card" key={eachMovie._id}>
                <img className="small-card-img" src={eachMovie.imageUrl} alt={eachMovie.title} />
                <div className="small-card-gradient"></div>
                <div className="small-card-title-genre-btn-container">
                    <div className="small-card-title-genre-container">
                        <h3 className="title">{eachMovie.title}</h3>
                        <p className="medium-text"> Genre: {eachMovie.genre?.join(" / ")}</p>
                        <p className="medium-text" >{eachMovie.releaseDate}</p>
                    </div>
                    <div className="small-card-arrow">
                        <button className="small-card-btn arrow" onClick={handleClick}>
                            {toggleDescription ?
                                <i class="fa-solid fa-chevron-up fa-2xl small-card-icon"></i>
                                : <i class="fa-solid fa-chevron-down small-card-icon fa-2xl"></i>
                            }
                        </button>
                    </div>
                </div>
                {toggleDescription && <p className="small-card-overview">{eachMovie.overview}</p>}
                <div className="small-card-playlist-interaction">
                    <div className="small-card-heart-trash">
                        <button className="small-card-btn" onClick={() => addToSelectedPlaylist(eachMovie._id, "favourites", userId, setFeedbackMessage)}><i className="fa-regular fa-heart small-card-icon"></i></button>
                        <button className="small-card-btn" onClick={() => deleteFromPlaylist(eachMovie._id)}><i className="fa-regular fa-trash-can small-card-icon"></i></button>
                    </div>
                    <div className="select-and-add">
                        <select className="select" onChange={(e) => setSelectedPlaylist(e.currentTarget.value)} name="" id="">
                            <option  >... select playlist</option>
                            {playListNames.map((eachName, index) => {
                                return (
                                    <option key={eachName + index} value={eachName} >{eachName}</option>
                                )
                            })
                            }
                        </select>
                        <div className="btn-with-text">
                            <button className="small-card-btn" onClick={() => addToSelectedPlaylist(eachMovie._id, selectedPlaylist, userId, setFeedbackMessage)}><i className="fa-solid fa-plus fa-2xl small-card-icon"></i></button>
                            <p className="small-text">Add</p>
                        </div>
                    </div>
                </div>

                {feedbackMessage && <p>{feedbackMessage}</p>}
            </div>
        </div>
    )
}

export default Smallcard