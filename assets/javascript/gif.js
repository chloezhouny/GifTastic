var topics = ["THE PURSUIT: BURN", "FIRESTARTER", "BEST ABS EVER", "PRECISION RUN", 
"REAL DEAL BOXING", "ROPES AND ROWERS", "TRILOGY BARRE", "PILATES FUSION", "THE MUSE", "FLOW CORE TONE", "ANTHEM"];
var topicsSearch = ["cardio", "boxing", "core training", "run training", "boxing", "ropes", "barre", "pilates", "dance cardio",
 "core training", "spinning class"];
var userAdd = false;
var start = true;

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



getButton();




$(document).on("click", ".options", function()
{
	$("#display").html("");
	$("#playlistDiv").text("");
	var topicSearch = $(this).attr("data-fitness");
	var state = $(this).attr("data-state");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicSearch + "&api_key=Uw1BIBPaxE2IeV3MmcjUxQ4ORA05PsKI&limit=10";
	var tokenURL = "https://accounts.spotify.com/api/token";
	var playlistURL = "https://api.spotify.com/v1/search?q=" + topicSearch + "&type=playlist&limit=10";	


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
				image.attr("src", $(image).attr("data-still"));
				item.append(image, rating);
				$("#display").append(item);
			}
	});

var clientId = '5e15085d2b924d049ae29907ee452bbf';
var clientSecret = 'e84f853c2b784addb982d679f609d73a';
var encodedData = window.btoa(clientId + ':' + clientSecret);
var token;


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
		'Content-Type': 'application/x-www-form-urlencoded'
	}
})
    .then (function(result) {
      console.log(result);
      token = result.access_token;


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
				playlist.append(img);

				playlists.append(playlist);
				
				$("#playlistDiv").append(playlists);
			}
		})


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





