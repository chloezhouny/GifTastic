var topics = ["REAL DEAL BOXING", "BEST ABS EVER", "TRILOGY BARRE", "PILATES FUSION", "FIRESTARTER", "THE PURSUIT: BURN", "PRECISION RUN", 
"ROPES AND ROWERS",  "THE MUSE", "FLOW CORE TONE", "ANTHEM"];
var topicsSearch = ["boxing", "core training", "ballet", "pilates", "cardio HIIT training", "spinning class", "runing", "ropes", "dancing",
 "core training", "cycling"];
var userAdd = false;
var start = true;
var token;

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


	jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
	});

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
			console.log(response);
			for(var i = 0; i<4; i++)
		{

			var result = response.playlists;
			var playlistURL = result.items[i].external_urls.spotify;

			var imgURL = result.items[i].images[0].url;
		

		

			var playlists = $("<div id = 'playlist'>");
			var playlist = $("<a href='" + playlistURL + "' target = 'blank'>");
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
		


})

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





