import { Routes, Route } from "react-router-dom";
import {useState} from "react";
import AllPlaylists from "./pages/AllPlaylistsPage/AllPlaylists";
import EditPlaylist from "./pages/EditPlaylist/EditPlaylist";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/PlaylistsForm/playlistsForm";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MoviesList from "./pages/MoviesList/MoviesList";
import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import BigCard from "./pages/BigCard/BigCard";
import Filters from "./components/Filters/Filters";
import TopNavbar from "./components/TopNavbar/TopNavbar";
import NotSignedIn from "./components/notSignedIn/NotSignedIn";
import "./App.css";

function App() {
  const [random, setRandom] = useState("")
  
  return (
    <div className="App">
      <TopNavbar />
      <Routes>
        <Route path="/" element={<HomePage setRandom={setRandom}/>} />
        <Route path="/allPlaylists" element={<IsPrivate><AllPlaylists   /> </IsPrivate> }/>
        <Route path="/moviesList/:nameList" element={<IsPrivate><MoviesList  /></IsPrivate> }/>
        <Route path="/editPlaylist/:playlistId/:oldName" element={<EditPlaylist/>} />
        <Route path="/playlists" element={<IsPrivate> <ProfilePage /> </IsPrivate>}/>
        <Route path ="/randomMovie"element={<BigCard random={random} />}/>
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>}/>
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>}/>
        <Route path="/filters" element={<IsPrivate><Filters setRandom={setRandom}/> </IsPrivate>}/>
        <Route path="/notSignedIn" element={<NotSignedIn />}/>

      </Routes>
      <Navbar />
    </div>
  );
}

export default App;
