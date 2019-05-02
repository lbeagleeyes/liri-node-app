require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var moment = require('moment');

var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});

function showMovieInfo(movie) {
  if (movie == "") {
    movie = "Mr.Nobody"
    writeToTxt("No movie entered, showing results for Mr.Nobody: \n");
  }

  axios.get(`http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=trilogy`).then(
    function (response) {
      //show
      writeToTxt(`\nMovie Title: ${response.data.Title} \nYear: ${response.data.Year}\nRating: ${response.data.imdbRating}\nRotten Tomatoes Rating: ${response.data.Ratings[1].Value}\nCountry: ${response.data.Country}\nLanguage:${response.data.Language}\nPlot: ${response.data.Plot}\nActors: ${response.data.Actors}\n`);
    }
  );
}

function showConcerts(artist) {
  if (artist != "") {

    axios.get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`).then(
      function (response) {

        writeToTxt(`\nConcerts for ${artist}: \n`);

        var concerts = response.data;
        concerts.forEach(event => {
          var eventDate = moment(event.datetime).format("MM/DD/YYYY");
          writeToTxt(`\n${event.venue.name} - ${event.venue.city}, ${event.venue.region}\t\tDate: - ${eventDate}`);
        });
      }
    );
  } else {
    writeToTxt("\nNo artist was provided \n");
  }
}

function showSong(song) {

  if (song == "") {
    song = "The Sign";
    writeToTxt("\nNo song provided, showing results for The Sign by Ace of Base\n");
  }

  spotify.search({ type: 'track', query: song }, function (err, data) {
    if (err) {
      return writeToTxt('Error occurred: ' + err);
    }

    var tracksFound = data.tracks.items;
    writeToTxt("\nTracks found:\n");
    for (var i = 0; i < tracksFound.length; i++) {

      writeToTxt(`\nArtists: ${getArtists(tracksFound[i].artists)}
                  \nPreview URL: ${tracksFound[i].preview_url != null?tracksFound[i].preview_url: ""}
                  \nSong Name: ${tracksFound[i].name}
                  \nAlbum Name: ${tracksFound[i].album.name}\n`);

    }
  });
}

function getArtists(artistsArr){
  var artistsList = "";
  for (var i=0; i<artistsArr.length; i++){
    artistsList += artistsArr[i].name;
    if((i+1)<artistsArr.length){
      artistsList += ", ";
    }
  }
  return artistsList;
}

function writeToTxt(str) {
  console.log(str);
  fs.appendFile("log.txt", str, function (err) {
    // If the code experiences any errors it will log the error to the console.
    if (err) {
      return console.log(err);
    }
  });
}

function doWhatItSays() {
  //read txt file and call performAction function with instruction and data
  writeToTxt("Do what it says called");
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return writeToTxt(error);
    }
    var dataArr = data.split(",");
    writeToTxt(`Instruction: ${dataArr[0]}, Data: ${dataArr[1]}`);
    performAction(dataArr[0], dataArr[1]);

  });

}

function performAction(instruction, data) {
  switch (instruction) {
    case "concert-this":
      showConcerts(data);
      break;
    case "spotify-this-song":
      showSong(data);
      break;
    case "movie-this":
      showMovieInfo(data);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      writeToTxt("\nInstruction not supported please enter one of the follwing options:\n concert-this \n spotify-this-song \n movie-this \n do-what-it-says \n");
      break;
  }
}

performAction(process.argv[2], process.argv.slice(3).join(" "));