import genres from '../../genres.json'
import { useState } from 'react'

const Filters = () =>{
    const [genresArr, setGenresArr] = useState(genres);

    const handleChange= (event) =>{
        // const value = event
        const value = event.target.value
        

        console.log("check", value);
    }
    return(
        <>
            <h1>filters</h1>
            {
                genresArr.map((eachGenre)=>{
                    return(
                        <div key={eachGenre.id} >
                            <label >
                                <input value={eachGenre.name} type="checkbox" onChange={(event)=>handleChange(event)} />
                                {eachGenre.name}
                            </label>
                        </div>
                    )
                })
            }
        </>
        
    )
}

export default Filters;