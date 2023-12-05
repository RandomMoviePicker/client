import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import './bigCard.css'
import { useNavigate } from "react-router-dom";
const URL = import.meta.env.VITE_SERVER_URL

const BigCard = (props) => {
    const { random, addToFavourites } = props
    const { user } = useContext(AuthContext);
    const [selectedPlaylist, setSelectedPlaylist] = useState("");
    const userId = user?._id
    const [repeatedMessage, setRepeatedMessage] = useState("")
    const navigate = useNavigate()
  

    const [playListNames, setPlayListNames] = useState([])


    const fetchPlaylists = async () => {
        try {
            const playLists = await fetch(URL + `/playlists?userId=${userId}`)
            const playListsJson = await playLists.json()
            const filteredPlaylists = playListsJson.filter((eachPlayList) => eachPlayList.name !== "favourites"
            )
            const onlyPlayListNames = filteredPlaylists.map((eachPlayList) => {
                return eachPlayList.name
            })
            setPlayListNames(onlyPlayListNames)
        }
        catch (error) {
            console.log(error)
        }


    }
    useEffect(() => {
        if (user) {
            fetchPlaylists()
        }
        if(!random){
            navigate("/")
        }
    }, [])

    const addToSelectedPlaylist = async(movieId, selectedPlaylist) => {
        
        const response = await fetch(URL + "/playlists/addMovie", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ movieId, selectedPlaylist, userId })
        })
        const responseJson = await response.json()
        console.log(responseJson);
        if(response.status === 403)
            setRepeatedMessage(responseJson.message)
    }
    return (
        <div className="big-card-container">
            <h1 className="big-card-title">{random.title}</h1>
            <img className="big-card-img" src={random.imageUrl} />
            <p className="big-genre"> Genre: {random.genre?.join(" / ")}</p>
            <p className="big-plot">Plot: {random.overview}</p>
            <p className="big-date">{random.releaseDate}</p>
            {user &&
                <>
                    <button onClick={() => addToFavourites(random._id)}>♥</button>

                    {playListNames.length > 0 &&
                        <>

                            <select onChange={(e) => setSelectedPlaylist(e.currentTarget.value)} name="" id="">
                                
                                <option  >.. select playlist</option>
                                {playListNames.map((eachName, index) => {

                                    return (
                                        <option key={eachName + index} value={eachName} >{eachName}</option>
                                    )
                                })
                                }
                            </select>

                            <button onClick={() => addToSelectedPlaylist(random._id, selectedPlaylist)}>➕</button>
                            {repeatedMessage && <p>{repeatedMessage}</p>}
                        </>
                    }
                </>
            }
        </div>
    )
}
export default BigCard