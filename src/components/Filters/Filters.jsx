import './filters.css'
import genres from '../../genres.json'
import { useState } from 'react'
const URL = import.meta.env.VITE_SERVER_URL
import { useNavigate } from "react-router-dom";

const Filters = (props) =>{
    const navigate = useNavigate()
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
        props.setRandom(responsejson[0])
        navigate("/RandomMovie")
        console.log(responsejson)
    }

    return(
        <>
            <h1 className='title-filters'>FILTERS</h1>
            <div className="container-genres">
            {
                includesGenresArr.map((eachGenre)=>{
                    return(
                        <div key={eachGenre} >
                            <label className='custom-checkbox-label' >
                            <div className='checkbox-container'>
                                <input value={eachGenre} type="checkbox" onChange={(event)=>handleChange(event)} />
                                <span className='checkbox-text'>{eachGenre}</span>
                                </div>
                            </label>
                        </div>
                    )
                })
            }
            </div>
            
            <button onClick={()=>fetchFiltered()}>Filter</button>
        </>
    )
}

export default Filters;