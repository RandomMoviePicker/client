import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link, useNavigate  } from "react-router-dom";
const URL = import.meta.env.VITE_SERVER_URL;

const AllPlaylists = () => {
    const { user } = useContext(AuthContext);
    const userId = user._id;
    const [nameList, setNameList] = useState([]);
    const navigate = useNavigate();

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
    const handleDelete = async(playlistId, name) =>{
        try{
            await fetch (URL + `/playlists/${playlistId}/${name}`, {method:"DELETE" });
            getNames();
        }
        catch(error){
            console.error(error);
        }

    }
    const handleEdit = (playlistId,oldName)=>{
        navigate(`/editPlaylist/${playlistId}/${oldName}`);
    }

    useEffect(() => {
        getNames();
    }, [])


    return (
        <div>
            {nameList.map((eachName) => {
                return (
                    <div key={eachName._id}>
                    <Link  to={`/moviesList/${eachName.name}`}> 
                      <button>{eachName.name}</button>
                    </Link>
                    {eachName.name !== "favourites" && 
                    <>
                      <button onClick={()=> handleDelete(eachName._id, eachName.name)}>🗑</button>
                      <button onClick={()=> handleEdit(eachName._id, eachName.name)}>✏</button>
                  </>}
                   </div>
                   )
            })}

            
        </div>
    )
}
export default AllPlaylists;