import "./smallcard.css";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
const URL = import.meta.env.VITE_SERVER_URL

const Smallcard = ({ eachMovie, addToFavourites, deleteFromPlaylist }) => {
    const { nameList } = useParams()
    const { user } = useContext(AuthContext);
    const [selectedPlaylist, setSelectedPlaylist] = useState("");
    const userId = user?._id
    const [playListNames, setPlayListNames] = useState([])
    const [repeatedMessage, setRepeatedMessage] = useState("")

    const fetchPlaylistsSmallCards = async () => {
        try {
            const playLists = await fetch(URL + `/playlists?userId=${userId}`)
            const playListsJson = await playLists.json()
            const filteredPlaylists = playListsJson.filter((eachPlayList) => eachPlayList.name !== nameList)
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
            fetchPlaylistsSmallCards()
        }
        // if(!random){
        //     navigate("/")
        // }
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
                <button onClick={() => addToFavourites(eachMovie._id)}>♥</button>
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
                <button onClick={() => addToSelectedPlaylist(eachMovie._id, selectedPlaylist)}>➕</button>
                {repeatedMessage && <p>{repeatedMessage}</p>}
            </div>
        </div>
    )
}

export default Smallcard