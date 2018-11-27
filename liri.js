require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);


var axios = require("axios");
var moment = require("moment");

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
var concertQueryUrl = "https://rest.bandsintown.com/artists/" + searchInput + "/events?app_id=codingbootcamp"
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

//Run a request with axios bandsintown API

function concert() {
  axios.get(concertQueryUrl)
    .then(function(response) {
      for (var i = 0; i < response.data.length; i++) {
        console.log(
          ` Venue: ${response.data[i].venue.name} `);
        console.log(
          ` City: ${response.data[i].venue.city}`);
        console.log(
          ` Date: ${moment(response.data[i].datetime).format('MM DD YYYY')}`);
      }
    })
    .catch(function(error) {
      console.log(error);
    });
};
// Function to retrieve info from Spotify API.
function song() {
  spotify.search({
    type: 'track',
    query: searchInput
  }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    for (var i = 0; i < data.tracks.items.length; i++) {
      data.tracks.items[i].album.artists.forEach(function(element) {
        console.log(`Artist: ${element.name}`);
      })
      console.log(`Album Name: ${data.tracks.items[i].album.name}`);
      console.log(`Track Name: ${data.tracks.items[i].name}`);
      console.log(`Song URL: ${data.tracks.items[i].external_urls.spotify}`)
    }
  })
}
//Function to retrieve info from OMDB API.
function movie() {
  axios.get(movieQueryUrl)
    .then(function(response) {
      console.log(
        `
Movie Title: ${response.data.Title}
Release Year: ${response.data.Year}
IMDB Rating: ${response.data.imdbRating}
Country Produced: ${response.data.Country}
Language: ${response.data.Language}
Plot: ${response.data.Plot}
Actors/Actresses: ${response.data.Actors}
`
      )
    })
    .catch(function(error) {
      console.log(error);
    })
  //Need an if statement that pulls info for Mr. Robot if no movie
  //is entered as a search input.
};

//Need a function that performs the "do-what-it-says" functionality - just ran out of time.