import { useState, useEffect } from "react";
const URL = import.meta.env.VITE_SERVER_URL



const RandomMovie = () => {
    const [random, setRandom] = useState("")
    const [movieList, setMovieList] = useState([])

    const getMovies = async () => {
        try {

            const response = await fetch(URL + "/movies/")
            const responseJson = await response.json()
            setMovieList(responseJson)
            const randomIndex = Math.floor(Math.random() * responseJson.length)
            console.log(responseJson[randomIndex])
            setRandom(responseJson[randomIndex])

        } catch (error) {
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
        </div>
    )
}

export default RandomMovie;