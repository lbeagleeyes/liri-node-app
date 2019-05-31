# liri-node-app - liri.js

* This application will take in the following parameters:

1. concert-this **Artist/Band Name**
2. spotify-this-song **Song Name** 
3. movie-this **Movie Name**
4. do-what-it-says

* **concert-this** will search the Bands in Town Artist Events API for the artist/band entered and diplay the following information for all the concerts found: 
    1. date
    2. name of the venue
    3. location 

* **spotify-this-song** will use node-spotify-api package in order to retrieve song information from the Spotify API. It will display the following information for all the songs found that match the entry
    1. artist(s)
    2. song's name
    3. preview link of the song from spotify
    4. album name 

* **movie-this** will use the imdb api to retrieve and show the following information: 
    1. Title 
    2. year 
    3. imdb rating
    4. rotten tomatoes rating
    5. country where the movie was produced
    6. language
    7. plot
    8. actors 

* **do-what-it-says** will run the instruction in the file *random.txt* (in the example is spotify-this-song for "I want it that way")

* All instructions results are saved in *log.txt*

[View Demo](https://drive.google.com/file/d/19Hd_p0gSkzqwje-ASW-JGUoF5jKktmTr/view?usp=sharing)




