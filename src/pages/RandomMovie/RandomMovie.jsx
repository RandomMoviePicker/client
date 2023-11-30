import { useState, useEffect } from "react";
const URL = import.meta.env.VITE_SERVER_URL



const RandomMovie = () => {
    const [random, setRandom] = useState("")

    const getMovies = async () => {
        try {

            const response = await fetch(URL + "/movies/randomMovie")
            const responseJson = await response.json()
            console.log(responseJson,responseJson[0])
            setRandom(responseJson[0])
            

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