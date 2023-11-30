import "./movieslist.css";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
const URL = import.meta.env.VITE_SERVER_URL;

const MoviesList = () => {
    const { user } = useContext(AuthContext);
    const userId = user._id;
    const [favourites, setFavourites] = useState([]);


    const getFavourites = async () => {
        const data = await fetch(URL + `/movies/favourites/${userId}`);
        const dataJson = await data.json();
        console.log(dataJson)//
        setFavourites(dataJson);
    }
    const addToFavourites = async (id) => {
        const movieId = id;
        try {
            await fetch(URL + "/favourites", {
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
        getFavourites();


    }, [])

    return (

        <div className="moviesList">
            {favourites.map((eachMovie) => {
                return (
                    <div className="movie-card" key={eachMovie._id}>
                        <h1 className="title">{eachMovie.title}</h1>
                        <img className="cover-img" src={eachMovie.imageUrl} alt={eachMovie.title} />
                        {eachMovie.genre.map((eachGenre, index) => {
                            return (
                                <h1 key={index}>{eachGenre}</h1>
                            )
                        })}

                        <p className="overview">{eachMovie.overview}</p>
                        <h2 className="release">{eachMovie.releaseDate}</h2>
                        <button onClick={() => addToFavourites(eachMovie._id)}>♥</button>
                    </div>
                )
            })}
        </div>
    )
}
export default MoviesList;