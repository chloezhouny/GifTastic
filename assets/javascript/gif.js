var topics = ["THE PURSUIT: BURN", "FIRESTARTER", "BEST ABS EVER", "PRECISION RUN", 
"REAL DEAL BOXING", "ROPES AND ROWERS", "TRILOGY BARRE", "PILATES FUSION", "THE MUSE", "FLOW CORE TONE", "ANTHEM"];
var topicsSearch = ["cardio", "boxing", "core training", "run training", "boxing", "ropes", "barre", "pilates", "dance cardio",
 "core training", "spinning class"];
var userAdd = false;

function getButton()
{
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
	$("#display").text("");
	var topicSearch = $(this).attr("data-fitness");
	console.log(topicSearch);
	var state = $(this).attr("data-state");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicSearch + "&api_key=Uw1BIBPaxE2IeV3MmcjUxQ4ORA05PsKI&limit=10";
	var playlistURL = "https://api.spotify.com/v1/search?q=Muse&type=playlist&limit=10"

	$.ajax({

		url: queryURL,
		method: "GET"
		
	})
		.then(function(response){
			console.log(response);
			var result = response.data;
			for(var i = 0; i<result.length; i++)
			{
				var item = $("<div id = 'item'>");

				var rating = $("<div>").text(result[i].rating);	
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

		$.ajax({
		url: playlistURL,
		method: "GET",
		Accept: "application/json",
		ContentType: "application/json",
		headers: {
		"Authorization": "Bearer BQA0YeaiuEiyjVqzTwvM2UskdvB3wM_c8tS22OKsE0TASLKpnK4PGgLuNapQikLPpb2KukFyurZ8yd45bIyslBazub_aZq65VZpVlyfsTAeToBFIFBQZXgxrhnmHsR-NXsNZ9DAHZqRzNHHS-w"}

	})
		.then(function(response){
			console.log(response);
			var result = response.playlists;
			var playlistURL = result.items[0].external_urls.spotify;
			console.log(playlistURL);
			var imgURL = result.items[0].images[0].url;
			console.log(imgURL);

			var playlistDiv = $("<div id = 'playlist'>");
			var playlist = $("<a href='" + playlistURL + "'>");
			var img = $("<img>");
			img.attr("src", imgURL);
			playlist.append(img);

			playlistDiv.append(playlist);
			
			$("#playlist").append(playlistDiv);

			})



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





