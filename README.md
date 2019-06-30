# GifTastic

This project builds a RPG card game with Jquery library. The player will choose a hero and fight as that hero for the rest of the game. To win the game the player must defeat all the remaining opponents. Trick is to pick the right enemies, not choosing the strongest player. 

<br>


## Demo 

![](assets/images/demo.gif)

<br>

## Code Snippets

### Spotify Authentification

To get a refreshable token when users request music on the website, register an account in Spotify, and you will be given a clientID and clientSecret. With that run ajax call to Spotify token API to request updated token as below:

```Javascript
	
	var tokenURL = "https://accounts.spotify.com/api/token";
	var clientId = 'your client ID';
	var clientSecret = 'your client secret';
	var encodedData = window.btoa(clientId + ':' + clientSecret);


		$.ajax({
		    method: "POST",
		    url: "https://accounts.spotify.com/api/token",
		    data: {
		      grant_type: 'client_credentials'
		    },
			headers: {
				"Authorization": "Basic "+ encodedData,
				'Content-Type': 'application/x-www-form-urlencoded',
				'x-requested-with': 'XMLHttpRequest'
			}
		})
		    .then (function(result) {
		      console.log(result);
		      token = result.access_token;
		 });
		    
```
<br>

###  Spotify Web Playback SDK

With spotify authorization, I set up Spotify Web Playback SDK to get a new device ID. Then I run ajax call for the track with device ID, and track uris that got from Spotify API. Here is the demo link that I used for Spotify Web Playback SDK: https://glitch.com/edit/#!/spotify-web-playback


<br>

## Technology Used


* HTML & CSS3
* JQuery
* UIkit
* Anime.js
* Bootstrap
* Giphy API
* Spotify API
* Spotify Web Playback SDK API

<br>

## Author
Chloe Zhou