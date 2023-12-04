import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import './bigCard.css'
const URL = import.meta.env.VITE_SERVER_URL

const BigCard = (props) => {
    const { random, addToFavourites } = props
    const { user } = useContext(AuthContext);
    const userId = user._id
    const [selectedPlaylist, setSelectedPlaylist] = useState("");


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
            console.log("THIS IS THE ONE THAT WE WANT !!!!!", filteredPlaylists)
            console.log("THIS IS THE ONE THAT WE WANT 2 !!!!!", onlyPlayListNames)
            setPlayListNames(onlyPlayListNames)

        }
        catch (error) {
            console.log(error)
        };


    }
    useEffect(() => {
        if (user) {
            fetchPlaylists()
        }
    }, [])

const addToSelectedPlaylist = (movieId, selectedPlaylist) =>{
    console.log(selectedPlaylist)
fetch (URL + "/playlists/addMovie", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ movieId, selectedPlaylist, userId})
})
}
    return (
        <div className="big-card-container">
            <h1 className="big-card-title">{random.title}</h1>
            <img className="big-card-img" src={random.imageUrl} />
            <p> Genre: {random.genre?.join(" / ")}</p>
            <p>Plot: {random.overview}</p>
            <p>{random.releaseDate}</p>
            {user &&
                <button onClick={() => addToFavourites(random._id)}>♥</button> 
            }
            {user &&
                <select  onChange={(e)=> setSelectedPlaylist(e.currentTarget.value)}  name="" id="">
                    {playListNames.map((eachName, index) => {
                        return (
                            <option key={eachName + index} value={eachName} >{eachName}</option>
                        )
                    })
                    }
                </select>
            }

            {user &&  
            <button onClick={() => addToSelectedPlaylist(random._id, selectedPlaylist)}>➕</button>
            }  
        </div>
    )
}
export default BigCard