import genres from '../../genres.json'
import { useState } from 'react'

const Filters = () =>{
    const [genresArr, setGenresArr] = useState(genres);

    return(
        <>
            <h1>filters</h1>
            {
                genresArr.map((eachGenre)=>{
                    return(
                        <>
                        <label>
                            <input type="checkbox"  />
                            {eachGenre.name}
                        </label>
                        </>
                    )
                })
            }
        </>
        
    )
}

export default Filters;