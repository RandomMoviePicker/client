import "./App.css";
import { Routes, Route } from "react-router-dom";
import {useState} from "react";
import AllPlaylists from "./pages/AllPlaylistsPage/AllPlaylists";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/PlaylistsForm/playlistsForm";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MoviesList from "./pages/MoviesList/MoviesList";
import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import RandomMovie from "./pages/RandomMovie/RandomMovie";
import Filters from "./components/Filters/Filters"
import { useParams } from "react-router-dom";

function App() {
   
  
  return (
    <div className="App">
      <Navbar />
     

      <Routes>
        <Route path="/" element={<HomePage />} />
        
        <Route path="/allPlaylists" element={<IsPrivate><AllPlaylists   /> </IsPrivate> }/>
        <Route path="/moviesList/:nameList" element={<IsPrivate><MoviesList  /></IsPrivate> }/>
        
        <Route
          path="/playlists"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />

        <Route 
        path ="/RandomMovie"
        element={
          <RandomMovie/>
        }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route path="/filters" element={<Filters/>}/>
      </Routes>
    </div>
  );
}

export default App;
