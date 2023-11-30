import { useState, useEffect } from "react";
const URL = import.meta.env.VITE_SERVER_URL



const RandomMovie = (props) => {
    const [random, setRandom] = useState("")
    const [movieList, setMovieList] = useState([])
    const setList = props.setList;


    const getMovies = async () => {
        try {

            const response = await fetch(URL + "/movies/")
            const responseJson = await response.json()
            setMovieList(responseJson)
            const randomIndex = Math.floor(Math.random() * responseJson.length)
            console.log(responseJson[randomIndex])//
            setRandom(responseJson[randomIndex])
            console.log(responseJson, "este")//
            setList(responseJson)
        } catch (error) {
            console.error(error)
        }

    }



    useEffect(() => {
        getMovies()

        

    }, [])  

    return (
        <div>
            <h1>
            {random.title}
            </h1>
            <img src={random.imageUrl}/>
            <p>{random.genre}</p> 
            <h3> {random.adult}</h3>
            <p>{random.overview}</p>  
        </div>
    )
}

export default RandomMovie;