const MoviesList = (props) =>{
    const {list, setlist} = props;
    

    return(
        <div className="moviesList">
{list.map((eachMovie)=>{
    return(
        <div className="movie-card" key={eachMovie._id}>
        <h1>{eachMovie.title}</h1>
        <img src={eachMovie.imageUrl} alt={eachMovie.title} />
        {eachMovie.genre.map((eachGenre, index)=>{
            return(
                <h1 key={index}>{eachGenre}</h1>
            )
        })}
        
        <p>{eachMovie.overview}</p>
        <h2>{eachMovie.releaseDate}</h2>
        </div>
    )
})}
        </div>
    )
}
export default MoviesList;