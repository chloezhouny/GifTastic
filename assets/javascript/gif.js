var topics = ["REAL DEAL BOXING", "BEST ABS EVER", "TRILOGY BARRE", "PILATES FUSION", "FIRESTARTER", "THE PURSUIT: BURN", "PRECISION RUN", 
"ROPES AND ROWERS",  "THE MUSE", "FLOW CORE TONE", "ANTHEM"];
var topicsSearch = ["boxing", "core training", "ballet", "pilates", "cardio HIIT training", "spinning class", "runing", "ropes", "dancing",
 "core training", "cycling"];
var userAdd = false;
var start = true;
var token;

jQuery.ajaxPrefilter(function(options) {
if (options.crossDomain && jQuery.support.cors) {
    options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
}
});

function getButton()
{

	if(start === true)
	{
		start = false;
	}

	if (userAdd === false)
	{
		for (var i = 0; i < topicsSearch.length; i++)
		{
			var btn = $("<button>").text(topics[i]);
			btn.addClass("btn btn-dark options");
			btn.attr("data-fitness", topicsSearch[i]);
			btn.attr("type", "button");
			$("#buttons-container").append(btn);
		}
		userAdd = true;
	}
	else
	{		
			var i = topicsSearch.length - 1 ;

			var btn = $("<button>").text(topics[i]);
			btn.addClass("btn btn-dark options");
			btn.attr("data-fitness", topicsSearch[i]);
			btn.attr("type", "button");
			$("#buttons-container").append(btn);
		
	}
}


function getSpotifyToken()
{
	var tokenURL = "https://accounts.spotify.com/api/token";
	var clientId = '5e15085d2b924d049ae29907ee452bbf';
	var clientSecret = 'e84f853c2b784addb982d679f609d73a';
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
		    // return token;

}

getButton();
getSpotifyToken();





var deviceId; 

 console.log(window.location.hash);
  // Get the hash of the url
  const hash = window.location.hash
  .substring(1)
  .split('&')
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
  window.location.hash = '';

  // Set token
  console.log("window hash", hash);
  let _token = hash.access_token;

  const authEndpoint = 'https://accounts.spotify.com/authorize';

  // Replace with your app's client ID, redirect URI and desired scopes
  const clientId = '5e15085d2b924d049ae29907ee452bbf';
  const redirectUri = 'http://localhost:8000/Desktop/Web_Bootcamp/HW/GifTastic';
  // const redirectUri = 'https://chloezhouny.github.io/GifTastic/';
  const scopes = [
    'streaming',
    'user-read-birthdate',
    'user-read-private',
    'user-modify-playback-state'
  ];

  // If there is no token, redirect to Spotify authorization
  
 if (!_token) {
    window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
    // window.open(`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`, "_blank");
  }



  // Set up the Web Playback SDK

  window.onSpotifyPlayerAPIReady = () => {
    const player = new Spotify.Player({
      name: 'Web Playback SDK Template',
      getOAuthToken: cb => { cb(_token); }
    });
    console.log(_token);
    console.log("debug")
    // Error handling
    player.on('initialization_error', e => console.error(e));
    player.on('authentication_error', e => console.error(e));
    player.on('account_error', e => console.error(e));
    player.on('playback_error', e => console.error(e));

    // Playback status updates
    player.on('player_state_changed', state => {
      console.log(state)
      $('#current-track').attr('src', state.track_window.current_track.album.images[0].url);
      $('#current-track-name').text(state.track_window.current_track.name);
    });

    // Ready
    player.on('ready', data => {
      console.log('Ready with Device ID', data.device_id);
      
      // Play a track using our new device ID
       deviceId = data.device_id;
      
    });

    // Connect to the player!
    player.connect();
  }



// Play a specified track on the Web Playback SDK's device ID
function play(device_id) {

  $.ajax({
   url: "https://api.spotify.com/v1/me/player/play?device_id=" + device_id,
   type: "PUT",
   data: '{"uris": ["'+trackURI+'"]}',
   beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + _token );},
   success: function(data) { 
     console.log(data)
   }
  });
}





var tracksAPIs = [];
var trackURI;








function getTrackURI()
{
  var tracksURL = tracksAPIs[0];
  $.ajax({
      url: tracksURL,
      method: "GET",
      Accept: "application/json",
      ContentType: "application/json",
      headers: {
      "Authorization": "Bearer "+ token}

    })
    .then(function(response){
      console.log(response);

      console.log(response.items[0].track.uri);
      trackURI = response.items[0].track.uri;
      play(deviceId);
      tracksAPIs = [];
    })

}



  function getPlaylist()
{
  $("#playlistDiv").text("");
  console.log(token);
  
  var topicSearch = $(this).attr("data-fitness");
  var state = $(this).attr("data-state");
  var playlistURL = "https://api.spotify.com/v1/search?q=" + topicSearch + "&type=playlist&limit=10"; 
  console.log(playlistURL);

}

$(document).on("click", "#button", function()
{
	getTrackURI();
	
})



$(document).on("click", ".options", function()
{
	$("#display").html("");
	$("#playlistDiv").text("");
	var topicSearch = $(this).attr("data-fitness");
	var state = $(this).attr("data-state");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicSearch + "&api_key=Uw1BIBPaxE2IeV3MmcjUxQ4ORA05PsKI&limit=10";
	var playlistURL = "https://api.spotify.com/v1/search?q=" + topicSearch + "&type=playlist&limit=10";	



      /* Spotify playlist API */
		$.ajax({
			url: playlistURL,
			method: "GET",
			Accept: "application/json",
			ContentType: "application/json",
			headers: {
			"Authorization": "Bearer "+ token}

		})
		.then(function(response){

			for(var i = 0; i<5; i++)
		{
			var playlistDiv;
			var result = response.playlists;
			// var playlistURL = result.items[i].external_urls.spotify;

			var imgURL = result.items[i].images[0].url;
			var tracksAPI = result.items[i].tracks.href;
      		tracksAPIs.push(tracksAPI);
      

			var playlists = $("<div id = 'playlist'>");
			var playlist = $("<a href='#' id = 'button'>");
			var img = $("<img>");
			img.attr("src", imgURL);
			img.addClass("uk-animation-scale-up uk-transform-origin-top-left uk-transition-fade");
			img.attr("background-color", "black")

			var playDiv =  $("<div id='play'>")
			playDiv.addClass("uk-transition-fade");
		

			playlist.addClass("uk-transition-toggle");
			playlist.addClass("uk-overflow-hidden");
			playlist.append(img);
			playlist.append(playDiv);
			

			playlists.append(playlist);
			
			$("#playlistDiv").append(playlists);
		}





	})




	    /* Giphy API */
		$.ajax({

			url: queryURL,
			method: "GET"
			
		})
			.then(function(response){
				console.log(response);
				var result = response.data;
				$("#display").append("<hr>");
				for(var i = 0; i<result.length; i++)
				{

					var item = $("<div id = 'item'>");

					var rating = $("<div>").text("Rating: "+ result[i].rating);	
					rating.attr("id", "rating");

					var image = $("<img>");
					image.attr("data-state", "still");
					image.attr("data-still", result[i].images.fixed_width_still.url);
					image.attr("data-animate", result[i].images.fixed_width.url);
					image.addClass("gif");
					image.addClass("uk-animation-scale-up uk-transform-origin-top-left")
					image.attr("src", $(image).attr("data-still"));

					item.addClass("uk-overflow-hidden");
					item.append(image, rating);
					$("#display").append(item);
				}
	});
		

});




	$(document).on("click", ".gif", function()
			{

			var state = $(this).attr("data-state");
			console.log(state);

			if ($(this).attr("data-state") === "still") 
				{
		    		$(this).attr("src", $(this).attr("data-animate"));
		    		$(this).attr("data-state", "animate");
		  		} 
			else 
				{
		    		$(this).attr("src", $(this).attr("data-still"));
		    		$(this).attr("data-state", "still");
		  		}

		})


	$(document).on("click", "#submit", function()
	{
		event.preventDefault();
		topicsSearch.push($("#add").val().trim());
		topics.push($("#add").val().trim());
		getButton();
	
	})




