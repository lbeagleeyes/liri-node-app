require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var fs = require("fs");
//var spotify = new Spotify(keys.spotify);

function showMovieInfo(movie) {
  if (movie == "") {
    movie = "Mr.Nobody"
    console.log("No movie entered, showing results for Mr.Nobody: \n");
  }

  axios.get(`http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=trilogy`).then(
    function (response) {
      //show
      console.log(`\nMovie Title: ${response.data.Title} \nYear: ${response.data.Year}\nRating: ${response.data.imdbRating}\nRotten Tomatoes Rating: ${response.data.Ratings[1].Value}\nCountry: ${response.data.Country}\nLanguage:${response.data.Language}\nPlot: ${response.data.Plot}\nActors: ${response.data.Actors}\n`);
    }
  );
}

function showConcerts(artist) {
  if (artist != "") {

    axios.get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`).then(
      function (response) {

        console.log("\nConcerts: \n");
       // console.log(response.data);

        var concerts = response.data;
        concerts.forEach(event => {
          //var eventDate = moment((event.datetime, "MM/DD/YYYY");
          console.log(` ${event.venue.name} - ${event.venue.city}, ${event.venue.region}\tDate: - ${event.datetime}\n`); 
        });
      }
    );
  } else {
    console.log("\nNo artist was provided \n");
  }
}

function showSong(song) {

  if (song == "") {
    song = "The Sign";
    console.log("\nNo song provided, showing results for The Sign by Ace of Base\n");
  }

  //call spotify api - authenticate and then call 

  //show:
  // artist
  // song's name
  // preview link
  // album the song is from

}

function doWhatItSays() {
  //read txt file and call performAction function with instruction and data
  console.log("Do what it says called");
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    console.log(`Instruction: ${dataArr[0]}, Data: ${dataArr[1]}`);
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
      console.log("\nInstruction not supported please enter one of the follwing options:\n concert-this \n spotify-this-song \n movie-this \n do-what-it-says \n");
      break;
  }
}

performAction(process.argv[2], process.argv.slice(3).join(" "));