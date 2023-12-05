import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useParams } from "react-router-dom";
import SmallCard from "../../components/SmallCard/SmallCard";
import "./movieslist.css";

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
    },[])

    return (
        <div className="moviesList">
            {movies.map((eachMovie) => {
                return (
                    <SmallCard key={eachMovie._id} eachMovie={eachMovie} deleteFromPlaylist={deleteFromPlaylist} />
                )
            })}
        </div>
    )
}
export default MoviesList;