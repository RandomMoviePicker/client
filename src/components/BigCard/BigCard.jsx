import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import './bigCard.css'

const BigCard = (props) => {
    const { random, addToFavourites } = props
    const { user } = useContext(AuthContext);
    
    const fetchPlaylists = () =>{

    }

    return(
        <div className="big-card-container">
            <h1 className="big-card-title">{random.title}</h1>
            <img className="big-card-img" src={random.imageUrl}/>
            <p> Genre: {random.genre?.join(" / ")}</p> 
            <p>Plot: {random.overview}</p>  
            <p>{random.releaseDate}</p>  
            {user &&  
                <button onClick={() => addToFavourites(random._id)}>♥</button>
            }
            <select name="" id="">

            </select>
            {/* {user &&  
                <button onClick={() => addToFavourites(random._id)}>➕</button>
            } */}
        </div>
    )
}
export default BigCard