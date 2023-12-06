import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import { fetchPlaylists, addToSelectedPlaylist } from "../../utils/fetchAndAddFunctions";
import './bigCard.css'

const BigCard = ({ random }) => {
    const { user } = useContext(AuthContext);
    const userId = user?._id
    const [playListNames, setPlayListNames] = useState([])
    const [feedbackMessage, setFeedbackMessage] = useState("")
    const [selectedPlaylist, setSelectedPlaylist] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            fetchPlaylists(userId, setPlayListNames, "favourites")
        }
        if (!random) {
            navigate("/")
        }
    }, [])

    return (
        <div className="big-card-container">
            <h1 className="big-card-title center">{random.title}</h1>
            <img className="big-card-img" src={random.imageUrl} />
            <p className="big-genre"> Genre: {random.genre?.join(" / ")}</p>
            <p className="big-plot">Plot: {random.overview}</p>
            <p className="big-date">{random.releaseDate}</p>
            {user &&
                <>
                    <div className="big-card-select-and-add">

                   
                    <button className="big-card-btn" onClick={() => addToSelectedPlaylist(random._id, "favourites", userId, setFeedbackMessage)}><i className="fa-regular fa-heart fa-2xl big-card-icon"></i></button>
                    {playListNames.length > 0 &&
                        <>
                            <select className="select" onChange={(e) => setSelectedPlaylist(e.currentTarget.value)} name="" id="">
                                <option  >.. select playlist</option>
                                {playListNames.map((eachName, index) => {
                                    return (
                                        <option key={eachName + index} value={eachName} >{eachName}</option>
                                    )
                                })
                                }
                            </select>
                            <div className="btn-with-text">
                                <button className="big-card-btn" onClick={() => addToSelectedPlaylist(random._id, selectedPlaylist, userId, setFeedbackMessage)}><i className="fa-solid fa-plus fa-2xl big-card-icon"></i></button>
                                <p className="small-text">Add</p>

                            </div>
                        </>
                    }
                    </div>
                    {feedbackMessage && <p >{feedbackMessage}</p>}
                </>
            }
        </div>
    )
}
export default BigCard