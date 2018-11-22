// require("dotenv").config();
// var Spotify = require('node-spotify-api');
// var spotify = new Spotify(keys.spotify);


var axios = require("axios");

// Take in listed command.
var command = process.argv[2];

// Store arguments in an array.
var nodeArgs = process.argv;

// Create an empty variable to hold the search input.
var searchInput = "";
// Create a for loop that includes inputs w/ multiple words, or includes "+" if the user chooses.
for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    searchInput = searchInput + "+" + nodeArgs[i];
  } else {
    searchInput += nodeArgs[i];
  }
};
// var concertQueryUrl = "https://rest.bandsintown.com/artists/" + searchInput + "/events?app_id=codingbootcamp"
// var spotifyQueryUrl = ""
var movieQueryUrl = "http://www.omdbapi.com/?t=" + searchInput + "&y=&plot=short&apikey=trilogy";
//Create a switch statement that determines which function to run based on the command.
switch (command) {
  case "concert-this":
    concert();
    break;
  case "spotify-this-song":
    song();
    break;
  case "movie-this":
    movie();
    break;
  case "do-what-it-says":
    doSomething();
    break;
};

//Run a request with axios to various APIs

//Display the results
// function concert() {
//   axios.get(concertQueryUrl)
//     .then(function(response) {
//       console.log(response.venue.name);
//     })
//     .catch(function(error) {
//       console.log(error);
//     });
// };
//
// spotify.search({
//   type: 'track',
//   query: searchInput
// }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }
//   console.log(data);
// });
function movie() {
  axios.get(movieQueryUrl)
    .then(function(response) {
        console.log(response)
      );
    };
  .catch(function(error) {
    console.log(error);
  });
};