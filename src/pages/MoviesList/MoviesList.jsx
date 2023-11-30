import "./movieslist.css";

const MoviesList = (props) => {
    const { list } = props;
//probably do a fetch to get the user playlist (we need to send the user as a prop?)


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