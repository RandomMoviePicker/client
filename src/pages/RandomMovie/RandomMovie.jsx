import { useState, useEffect } from "react";
const URL = import.meta.env.VITE_SERVER_URL
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";


const RandomMovie = () => {
    const { user } = useContext(AuthContext);
    let userId = null;
    if(user){
         userId = user._id;
    }
    const [random, setRandom] = useState("")

    const getMovies = async () => {
        try {
            
            const response = await fetch(URL + "/movies/randomMovie")
            const responseJson = await response.json()
            setRandom(responseJson[0])
        } catch (error) {
            console.error(error)
        }

    }

    const addToFavourites = async (id) => {
        console.log("holaaaa")
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
        <>
        {
        
            <div className="movies-container">
                <h1>
                {random.title}
                </h1>
                <img src={random.imageUrl}/>
                <p> Genre: {random.genre?.join(" / ")}</p> 
                <p>Plot: {random.overview}</p>  
                <p>{random.releaseDate}</p>  
                {user &&  
                <button onClick={() => addToFavourites(random._id)}>♥</button>
            }
            </div>
           
        }
        </>
    )
}

export default RandomMovie;