//require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");
var spotify = require("node-spotify-api");
//var spotify = new spotify(keys.spotify);
var twitter = require("twitter");
var client = new twitter(keys.twitter);
var fs = require("fs");

var user = process.argv[2];
var user2 = process.argv[3];

console.log("Type: my-tweets, spotify-this-song, moive-this ,what-it-says to start");

function start() {

    switch (user) {
        case "my-tweets":
            loadTweets();
            break;

        case "spotify-this-song":
            loadSpotify();
            break;

        case "movie-this":
            loadMovie();
            break;

        //case "what-it-says":
           // loadWhat();
           // break;
    }
};



function loadTweets() {
    console.log("Tweets are coming");

    if (user == "my-tweets");

    var params = { screen_name: "espn", count: 20 };
    client.get("statuses/user_timeline", params, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);

            /*for (i = 0; i < tweets.length; i++) {
                var returnData = ("Number: " + (i + 1) + "/n" + tweets[i].created_at + "/n"
                    + tweets[i].text + "/n");*/
                console.log("********************************************");
                console.log(tweets);
                console.log("********************************************");


            }
        })
    }

function loadSpotify() {
    console.log("Music is coming");

    /* var searchTrack;
     if (user == undefined) {
         searchTrack = "the sign";
     }
     else {
         searchTrack = user;
     }*/
    if (user == "spotify-this-song");
    spotify.search({ type: 'track', query: user2}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        else {
            console.log("**********************************************");
            console.log("Artist: " + data.tracks.items[0].artist[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Preview here: " + data.tracks.items[0].preview_url);
            console.log("***********************************************");

        }
    })
}

function loadMovie() {
    console.log("check out some movies");

    /*var searchMovie;
    if (user == undefined) {
        searchMovie = "Mr. Nobody";
    }
    else {
        searchMovie = user;
    };*/
    if (user == "movie-this");
    var queryUrl = "http://www.omdbapi.com/?t=" + user2 + "&y=&plot=short&apikey=trilogy";


    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {


        if (!error && response.statusCode === 200) {

            console.log("*****************************************");
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("Title: " + JSON.parse(body).Title);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].value);
            console.log("Country: + " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("*******************************************");
        }
    });
}
start();  