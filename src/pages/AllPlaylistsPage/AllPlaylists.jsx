import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import "./allPlaylists.css"

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
            console.log(dataJson)
            setNameList(dataJson)

        }

        catch (error) {
            console.error(error);
        }
    }
    const handleDelete = async (playlistId, name) => {
        try {
            await fetch(URL + `/playlists/${playlistId}/${name}`, { method: "DELETE" });
            getNames();
        }
        catch (error) {
            console.error(error);
        }

    }
    const handleEdit = (playlistId, oldName) => {
        navigate(`/editPlaylist/${playlistId}/${oldName}`);
    }

    useEffect(() => {
        getNames();
    }, [])


    return (
        <div>
            {nameList.map((eachName) => {
                return (
                    <div className="each-playlists-preview-container" key={eachName._id}>
                        <div className="playlist-btn-container">
                            <Link to={`/moviesList/${eachName.name}`}>
                                <button className="playlist-btn">{eachName.name}</button>
                            </Link>
                            {eachName.name !== "favourites" &&
                                <>
                                    <button className="playlist-card-btn playlist-card-icon" onClick={() => handleDelete(eachName._id, eachName.name)}><i class="fa-regular fa-trash-can small-card-icon"></i></button>
                                    <button  className="playlist-card-btn playlist-card-icon" onClick={() => handleEdit(eachName._id, eachName.name)}><i class="fa-regular fa-pen-to-square"></i></button>
                                </>}
                            
                        </div>
                        <div className="images-container">
                            {
                                eachName.content.map((eachMovie)=>{
                                    return(
                                        <div>
                                            <img className="allplaylists-small-movie-img" src={eachMovie.imageUrl} alt="" />
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                )
            })}


        </div>
    )
}
export default AllPlaylists;