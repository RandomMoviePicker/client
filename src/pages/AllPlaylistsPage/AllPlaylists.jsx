import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";
const URL = import.meta.env.VITE_SERVER_URL;

const AllPlaylists = () => {
    const { user } = useContext(AuthContext);
    const userId = user._id;
    const [nameList, setNameList] = useState([]);
    

    const getNames = async () => {
        try {
            const data = await fetch(URL + "/playlists?userId=" + userId);
            const dataJson = await data.json();
            setNameList(dataJson)

        }
        catch (error) {
            console.error(error);
        }
    }
    

    useEffect(() => {
        getNames();
    }, [])


    return (
        <div>
            {nameList.map((eachName) => {
                return (

                   <Link key={eachName._id} to={`/moviesList/${eachName.name}`}> 
                  <button>{eachName.name}</button>
                   </Link>)
            })}

            
        </div>
    )
}
export default AllPlaylists;