# PickaMovie: Full Stack Web App

This is the initial setup for project 3.

Fork this repository to your org account, then clone it to your local machine.
The rest of the team will clone the forked repository to their local machines as well.

# About this project:

This app purpose is to select a random movie extract from the TMDB (the movie data base) API, the user can press the big red button on the home page
and recieve a result or go to filters and discard the genres he/she is not interested in.

The app also allows to save the movie results as favourites, and visit its content. He/She also can create new playlist of movies, and customize the name latter, also add and delete movies from it.

Some of the features require the user to be logged in, those are: filtering, adding to favourites and create new playlists. 
When that happens the user can easily sign up and logg in or keep using the big red button to get a random movie without filtering.




## Setup dotenv
Once you have cloned the repository, create a `.env` file in the root of the project.
Add the following to the `.env` with your infomration:
```
VITE_SERVER_URL=http://localhost:5005
```
Vite uses this variable naming convention. The `VITE_` prefix is required. Make sure that the url for the server matches the port that you are using for your it.

## Routes table 
 ____________________________________________________________________________________________________________________________________
|  Component  |               Path                |                                   Description                                   |
|-------------|-----------------------------------|---------------------------------------------------------------------------------|
| LoginPage   |             /login                | Displays the login form                                                         |
| SignupPage  |             /signup               | Displays the sign up form                                                       |
| HomePage    |             /                     | Displays the home page with the movie picker button                             |
| BigCard     |             /randomMovie          | Returns the movie picked from filters or button                                 |
| MoviesList  |       /moviesList/:nameList       | Returns the content of the selected playlist                                    |
|PlaylistForm |             /playlist             | Displays the form to create a new playlist                                      |
|EditPlaylist |/editPlaylist/:playlistId/:oldName | Displays the form to edit the selected playlist                                 |
|NotSignedIn  |             /notSignedIn          | Displays a message when a not logged in user selects an only logged in feature  |
|  Filters    |             /filters              | Displays the page with the genres to filter by                                  |
|NotFoundPage |             /*                    | Displays a message when the route doesn't exists                                |
|_____________|___________________________________|_________________________________________________________________________________|