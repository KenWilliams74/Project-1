
$("#getCardsBtn").on("click", function () {

    var playerIDs = [401, 15, 237, 115, 192, 274, 145, 246, 172, 278, 79, 472, 447, 228, 185, 189, 367, 322, 132, 268];

    var random = Math.floor(Math.random() * (playerIDs.length));
    var queryUrl = "https://www.balldontlie.io/api/v1/players/" + playerIDs[random];

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        var player = $("<div>");
        var playerName = $("<h2>").text(response.first_name + " " + response.last_name);
        player.append(playerName);
        $("body").append(player);

        var giphyURL = "https://api.giphy.com/v1/gifs/search?api_key=r5a74bhCukDolWrKODqTTY4GbFMqGnP5&q=" + response.first_name + " " + response.last_name + "&limit=10&offset=0&rating=R&lang=en";

        $.ajax({
            url: giphyURL,
            method: "GET"
        }).then(function (response) {
    
            console.log(response);
    
            var gifDiv = $("<div>");
            var gif = $("<img>").attr("src", response.data[0].images.fixed_height.url);
            gifDiv.append(gif);
            $("body").append(gifDiv);
    
    
        })
    })



})