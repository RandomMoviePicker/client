import {useState, useEffect} from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
const URL = import.meta.env.VITE_SERVER_URL;

const AllPlaylists = () => {
    const [selectedPlaylist, setSelectedPlaylist] = useState("");
    const {user} = useContext(AuthContext);
    const userId = user._id;

const getNames = async() =>{
    const data = await fetch (URL + "/playlists?userId=" + userId )
    console.log(data)
}

useEffect(()=>{
    getNames();
},[])


    return(
<></>
    )
}
export default AllPlaylists;