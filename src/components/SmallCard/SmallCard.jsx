import "./Smallcard.css";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";


const Smallcard = ({eachMovie,addToFavourites ,deleteFromPlaylist}) => {


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

        </div>
        </div>
    )
}

export default Smallcard