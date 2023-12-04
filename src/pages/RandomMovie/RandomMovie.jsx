const URL = import.meta.env.VITE_SERVER_URL
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import BigCard from '../../components/BigCard/BigCard'

const RandomMovie = ({random}) => {
    console.log(random)
    const { user } = useContext(AuthContext);
    let userId = null;
    if(user){
        userId = user._id;
    }
    
    const fetchPlaylists = async () => {
        try {

            const playlists = await fetch(URL + `/playLists/?userId=${userId}`)
            console.log(playlists)

        }
        catch (error) {
            console.log(error)
        };


    }

    const addToFavourites = async (id) => {
        const movieId = id;
        try {
            await fetch(URL + "/movies/favourites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ movieId, userId })
            })
        }
        catch (error) {
            console.error(error)
        }
    } 

    return (
        <>
        {
            <div className="movies-container">
                <BigCard random={random} addToFavourites={addToFavourites}/>
            </div>
        }
        </>
    )
}

export default RandomMovie;