import { useState, useEffect } from "react";
const URL = import.meta.env.VITE_SERVER_URL
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";


const RandomMovie = () => {
    const { user } = useContext(AuthContext);
    const userId = null;
    if(user){
        const userId = user._id;////////////////////////////////
    }
    const [random, setRandom] = useState("")

    const getMovies = async () => {
        try {

            const response = await fetch(URL + "/movies/randomMovie")
            const responseJson = await response.json()
            setRandom(responseJson[0])
            console.log(random)////////////////////////////////null

        } catch (error) {
            console.error(error)
        }

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

    useEffect(() => {
        getMovies()

        

    }, [])  

    return (
        <div className="movies-container">
            <h1>
            {random.title}
            </h1>
            <img src={random.imageUrl}/>
            <p>{random.genre}</p> 
            {random.adult ? "😚" : "✔"}
            <p>Plot: {random.overview}</p>  
            <p>{random.releaseDate}</p>  
            {user &&    //////////////////////////////////////////////////////////////////77
            <button onClick={() => addToFavourites(random._id)}>♥</button>
            }
        </div>
    )
}

export default RandomMovie;