import {useState, useEffect, useContext} from "react";
import { AuthContext } from "../../context/auth.context";
const URL = import.meta.env.VITE_SERVER_URL;

const AllPlaylists = () => {
    const [selectedPlaylist, setSelectedPlaylist] = useState("");
    const [nameList, setNameList] = useState([]);
    const { user } = useContext(AuthContext);
    console.log(user)
    const userId = user?._id;

const getNames = async() =>{
    console.log("getnames")
    try{
        const data = await fetch (URL + "/playlists?userId=" + userId );
        const dataJson = await data.json();
        setNameList(dataJson)
        console.log("1:",dataJson)
        console.log("2:",nameList)
    }
    catch(error){
        console.error(error);
    }
}
const handleClick = (playlistName) =>{
    setSelectedPlaylist(playlistName);
}

useEffect(()=>{
    getNames();
},[])


    return(
        <div>
            {nameList.forEach((eachName)=>{
                return(

                <button key={eachName} onClick={()=>handleClick(eachName)} >{eachName}</button>
                )            
            })}
            
         {selectedPlaylist && `You have selected ${selectedPlaylist}`}
        </div>
    )
}
export default AllPlaylists;