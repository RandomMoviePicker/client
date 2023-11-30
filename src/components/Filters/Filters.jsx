import genres from '../../genres.json'
import { useState } from 'react'
const URL = import.meta.env.VITE_SERVER_URL

const Filters = () =>{
    const [includesGenresArr, setIncludesGenresArr] = useState(genres);
    const [excludesGenresArr, setExcludesGenresArr] = useState([]);

    const handleChange= (event) =>{
        const value = event.target.value
        const copyGenresArr = [...includesGenresArr]
        const updatedGenreArr = copyGenresArr.filter((eachGenre)=>{
            if(eachGenre !== value)
            {
                return eachGenre;
            }
            else{
                setExcludesGenresArr((previous)=>[...previous, eachGenre])
            }
        })
        setIncludesGenresArr(updatedGenreArr)
    }
    const fetchFiltered = async () =>{
        const response = await fetch(`${URL}/movies/filter?included=${includesGenresArr}&excluded=${excludesGenresArr}`)
        const responsejson = await response.json();
        console.log(responsejson)
    }

    return(
        <>
            <h1>filters</h1>
            {
                includesGenresArr.map((eachGenre)=>{
                    return(
                        <div key={eachGenre} >
                            <label >
                                <input value={eachGenre} type="checkbox" onChange={(event)=>handleChange(event)} />
                                {eachGenre}
                            </label>
                        </div>
                    )
                })
            }
            <button onClick={()=>fetchFiltered()}>Filter</button>
        </>
    )
}

export default Filters;