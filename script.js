
$("#getCardsBtn").on("click", function () {

    var playerIDs = [401, 15, 237, 115, 192, 274, 145, 246, 172, 278, 79, 472, 447, 228, 185, 189, 367, 322, 132, 268];


    for(var i = 0; i < 3; i++) {
        var random = Math.floor(Math.random() * (playerIDs.length));
        var queryUrl = "https://www.balldontlie.io/api/v1/players/" + playerIDs[random];

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
    
            console.log(response);
    
            var playerCard = $("<div>").addClass("uk-card uk-card-default").addClass("player-card");
            var cardBody = $("<div>").addClass("uk-card-body");
            
            var playerName = $("<h2>").addClass("uk-card-title").text(response.first_name + " " + response.last_name);
            var height = $("<h4>").text("Height: " + response.height_feet + "' " + response.height_inches + '"');
            var weight = $("<h4>").text("Weight: " + response.weight_pounds);
            var team = $("<h4>").text("Team: " + response.team.full_name);
            cardBody.append(playerName, height, weight, team);
            playerCard.append(cardBody);
            $("body").append(playerCard);
    
            var giphyURL = "https://api.giphy.com/v1/gifs/search?api_key=r5a74bhCukDolWrKODqTTY4GbFMqGnP5&q=" + response.first_name + " " + response.last_name + "&limit=10&offset=0&rating=R&lang=en";
    
            $.ajax({
                url: giphyURL,
                method: "GET"
            }).then(function (response) {
        
                console.log(response);
        
                var gifDiv = $("<div>").addClass("uk-card-media-top");
                var gif = $("<img>").attr("src", response.data[0].images.fixed_height.url);
                gifDiv.append(gif);
                $(playerCard).prepend(gifDiv);
                $(".player-div").append(playerCard);
            })
        })
    }
    




})