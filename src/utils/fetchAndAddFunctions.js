const URL = import.meta.env.VITE_SERVER_URL

const fetchPlaylists = async (userId, setPlayListNames, excludedPlaylist) => {
    try {
        const playLists = await fetch(URL + `/playlists?userId=${userId}`)
        const playListsJson = await playLists.json()
        const filteredPlaylists = playListsJson.filter((eachPlayList) => eachPlayList.name !== excludedPlaylist
        )
        const onlyPlayListNames = filteredPlaylists.map((eachPlayList) => {
            return eachPlayList.name
        })
        setPlayListNames(onlyPlayListNames)
    }
    catch (error) {
        console.log(error)
    }
}

const addToSelectedPlaylist = async (movieId, selectedPlaylist, userId, setFeedbackMessage) => {

    const response = await fetch(URL + "/playlists/addMovie", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ movieId, selectedPlaylist, userId })
    })
    const responseJson = await response.json()
    setFeedbackMessage(responseJson.message)
}

export { fetchPlaylists, addToSelectedPlaylist }