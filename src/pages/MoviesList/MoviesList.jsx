import "./movieslist.css";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useParams } from "react-router-dom";
import SmallCard from "../../components/SmallCard/SmallCard";

const URL = import.meta.env.VITE_SERVER_URL;

const MoviesList = () => {

    const { user } = useContext(AuthContext);
    const userId = user._id;
    const [movies, setMovies] = useState([]);
    const { nameList } = useParams();


    const getPlaylistMovies = async () => {
        try {
            const data = await fetch(URL + `/playlists/${nameList}/${userId}`);
            const dataJson = await data.json();
            setMovies(dataJson);
        } catch (error) {
            console.log(error)
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
    const deleteFromPlaylist = async (movieId) => {
        try {
            const data = await fetch(URL + `/playlists/${nameList}/${userId}/${movieId}`);
            const dataJson = await data.json();
            setMovies(dataJson);
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getPlaylistMovies();


    }, [])

    return (

        <div className="moviesList">
            {movies.map((eachMovie) => {
                return (
                    <SmallCard key={eachMovie._id} eachMovie={eachMovie} addToFavourites={addToFavourites} deleteFromPlaylist={deleteFromPlaylist} />
                )
            })}
        </div>
    )
}
export default MoviesList;