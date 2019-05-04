# liri-node-app - liri.js

* This application will take in the following parameters:

1. spotify-this-song <Song Name>
2. movie-this <Movie Name>
3. concert-this <Artist/Band Name>
4. do-what-it-says

*concert-this will search the Bands in Town Artist Events API for the artist/band entered and diplay the date, name of the venue and location of all the concerts found. 

*spotify-this-song will use node-spotify-api package in order to retrieve song information from the Spotify API. It will display the artist(s), song's name, preview link of the song from spotify and the album for all the songs found that match the entry. 

*movie-this will use the imdb api to retrieve and show the following information: Title, year, imdb rating, rotten tomatoes rating, country where the movie was produced, language, plot and actors. 

*do-what-it-says will run the instruction in the file random.txt (in the example is spotify-this-song for "I want it that way")

*All instructions results are saved in log.txt

*[See Demo] (liri-node-app-demo.webm)




