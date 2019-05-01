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
      // DataTransferItemListYear
      // IMDB imdbRating
      // Rotten tomatoes imdbRating
      // Country where the movie was produced
      // language 
      // plot 
      // actors 
      console.log(response.data);

      console.log("\nThe movie's rating is: " + response.data.imdbRating);
    }
  );
}

function showConcerts(artist) {
  if (artist != "") {

    axios.get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`).then(
      function (response) {
        //show
        //Name of venue
        //venue location
        //date of the event in MM/DD/YYYY format

        console.log("Concerts: \n");
        console.log(response.data);

        // array.forEach(event => {
        // });
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

  // axios.get(`https://accounts.spotify.com/authorize?client_id=${keys.spotify.id}&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09`).then(
  //     function (response) {
       


  //       console.log(response);

  //     }
  //   );

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

//var data = process.argv.slice(3).join(" ");
//console.log(`instrunction: ${process.argv[2]}, data: ${data}`);

performAction(process.argv[2], process.argv.slice(3).join(" "));