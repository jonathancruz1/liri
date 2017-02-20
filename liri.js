var fs = require ("fs");
var keys = require ("./keys.js");
var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var inquirer = require("inquirer")

var input = process.argv[2];
var song = process.argv.slice(3).join(' ');
var movie = process.argv.slice(3).join(' ');


if (song.length === 0)
	song = "The Sign";

if (movie.length === 0)
	movie = "Mr. Nobody";

if (input==="my-tweets"){
	twitter_func();
}
else if (input==="spotify-this-song"){
	spotify_func(song);
}
else if (input==="movie-this"){
	movie_func(movie);
}
else if (input==="do-what-it-says"){
	doWhatItSays_func();
}

//Twitter
function twitter_func(){

	var twitterKeys = keys.twitterKeys;
	var client = new twitter({
		consumer_key: twitterKeys.consumer_key,
		consumer_secret: twitterKeys.consumer_secret,
		access_token_key: twitterKeys.access_token_key,
		access_token_secret: twitterKeys.access_token_secret
	});

	var twitterID = "MrJonathanCruz";
	var twitterURL = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" + twitterID + "&count=20";
	client.get(twitterURL, function(err, tweets, response){
		if (!err){
			console.log("Your last 20 tweets: ");
			
			for(let i = 0; i < tweets.length; i++){
				console.log([i] + " Tweet: " + tweets[i].text + " " + tweets[i].created_at);
			}
		} else {
			console.log(err);
		}
	})
};

//Spotify
function spotify_func (song){
	console.log('spotify');

	spotify.search({
		type: 'track',
		query: song
	}, function(err, data){
		if(!err){
			for (var i = 0; i < 5; i++){
				if (data.tracks.items[i] != undefined){
					console.log(" ");
					console.log('Artist: ' + data.tracks.items[i].artists[0].name);
					console.log('Song: ' + data.tracks.items[i].name);
					console.log('Preview Url: ' + data.tracks.items[i].preview_url);
					console.log('Album: ' + data.tracks.items[i].album.name);
				}
			}
		}
	});
}

//OMDB
function movie_func(movieTitle){
	console.log(movieTitle);
		request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&r=json&tomatoes=true", function(error, response, body) {
		 console.log(movieTitle);
			if (!error && response.statusCode === 200) {

				var info = JSON.parse(body)
			    
			    console.log("Title: " + info.Title);
			    console.log("Year: " + info.year);
			    console.log("IMDB Rating: " + info.imdbRating);
			  	console.log("Country: " + info.Country);
			  	console.log("Language: " + info.Language);
			  	console.log("Plot: " + info.Plot);
			  	console.log("Actors: " + input.Actors);
			  	console.log("Rotten Tomatoes Rating: " + info.metascore);
			  	console.log("Rotten Tomatoes URL: " + info.imdbRating);
		  	}
		});
}

//Do What It Says
function doWhatItSays_func(){
	fs.readFile("random.txt", "utf8", function(err, data){
		var split = data.split(",");
		console.log(split);
		
		var value = split[i];
		spotify(value);
	})
}