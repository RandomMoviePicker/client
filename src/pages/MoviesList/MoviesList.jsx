import "./movieslist.css";
import { AuthContext } from "../../context/auth.context";

const MoviesList = () => {
    const { user } = AuthContext;

    const getFavourites = async() =>{
        const data = await fetch ()
    }


    return (
        <div className="moviesList">
            {list.map((eachMovie) => {
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
                    </div>
                )
            })}
        </div>
    )
}
export default MoviesList;