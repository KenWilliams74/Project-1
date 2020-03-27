

var playerArray = [];
var playerIDs = [401, 15, 237, 115, 192, 274, 145, 246, 172, 278, 79, 472, 447, 228, 185, 189, 367, 322, 132, 268];


//code for index.html
$("#getCardsBtn").on("click", function () {
    $(".player-div").empty();
    
    var packImgContainer = $(".uk-animation-toggle").attr("tabindex", "0");

    var packImg = $("<div>").addClass("uk-animation-shake uk-animation-reverse");
    var img = $("<img>").attr("src", "https://cdn.pixabay.com/photo/2017/06/03/07/54/basketball-2368164_960_720.jpg").attr("id", "packimg") .addClass("uk-align-center");

    packImg.append(img);
    packImgContainer.append(packImg);

})

$(document).on("click", "#packimg", function(event) {
    $(this).parent().empty();

    let random;

    for (var i = 0; i < 3; i++) {
        random = Math.floor(Math.random() * (playerIDs.length));
        let queryUrl = "https://www.balldontlie.io/api/v1/players/" + playerIDs[random];
        let statsURL = "https://www.balldontlie.io/api/v1/stats?player_ids[]=" + playerIDs[random] + "&seasons[]=2018";

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {

            var player = {};

            var playerCard = $("<div>").addClass("uk-card uk-card-default uk-width-large@m card-space").addClass("player-card");
            var cardBody = $("<div>").addClass("uk-card-body card-space");

            var playerName = $("<h2>").addClass("uk-card-title").text(response.first_name + " " + response.last_name);
            var height = $("<p>").text("Height: " + response.height_feet + "' " + response.height_inches + '"');
            var weight = $("<p>").text("Weight: " + response.weight_pounds);
            var team = $("<p>").text("Team: " + response.team.full_name);
            cardBody.append(playerName, height, weight, team);
            playerCard.append(cardBody);
            $(".cards").append(playerCard);

            player.id = response.id;
            player.firstName = response.first_name;
            player.lastName = response.last_name;
            player.heightFeet = response.height_feet;
            player.heightInches = response.height_inches;
            player.weight = response.weight_pounds;
            player.teamName = response.team.full_name;


            $.ajax({
                url: statsURL,
                method: "GET"
            }).then(function (response) {

                console.log(response);

                var points = 0;
                var assists = 0;
                var rebounds = 0;

                for (var j = 0; j < response.data.length; j++) {
                    points += response.data[j].pts;
                    assists += response.data[j].ast;
                    rebounds += response.data[j].reb;
                }

                var avgPoints = points / response.data.length;
                var avgAssists = assists / response.data.length;
                var avgRebounds = rebounds / response.data.length;

                var ppg = $("<p>").text("2018 PPG: " + avgPoints);
                var apg = $("<p>").text("2018 APG: " + avgAssists);
                var rpg = $("<p>").text("2018 RPG: " + avgRebounds);

                cardBody.append(ppg, apg, rpg);

                player.ppg = avgPoints;
                player.apg = avgAssists;
                player.rpg = avgRebounds;

                var giphyURL = "https://api.giphy.com/v1/gifs/search?api_key=r5a74bhCukDolWrKODqTTY4GbFMqGnP5&q=" + player.firstName + " " + player.lastName + "&limit=10&offset=0&rating=R&lang=en";
                $.ajax({
                    url: giphyURL,
                    method: "GET"
                }).then(function (response) {

                    var gifDiv = $("<div>").addClass("uk-card-media-top");
                    var gif = $("<img>").attr("src", response.data[0].images.downsized_large.url);
                    gifDiv.append(gif);
                    $(playerCard).prepend(gifDiv);
                    $(".player-div").append(playerCard);

                    player.gif = response.data[0].images.downsized_large.url;

                   
                    var playerExist = false;
                    for(var i = 0; i < playerArray.length; i++) {
                        if(playerArray[i].id === player.id) {
                            playerExist = true;
                        }
                    }
                    if(!playerExist) {
                        playerArray.push(player);
                    }
                    
                    localStorage.setItem("playerArray", JSON.stringify(playerArray));
                })
            })
        })
    }
})


// Code for mycards.html

$("#myCardsBtn").on("click", function () {

    var players = JSON.parse(localStorage.getItem("playerArray"));
    console.log(players);
    

    for (var i = 0; i < players.length; i++) {

        if (players[i].ppg > 24) {
            var cardDiv = $("#cardsGoHere");
            var li = $("<li>").attr("data-rarity", "legendary");
            var card = $("<div>").addClass("uk-card uk-card-default uk-card-body legendary");
            var gif = $("<img>").attr("src", players[i].gif);
            var name = $("<h2>").text(players[i].firstName + " " + players[i].lastName);
            var teamName = $("<p>").text("Team: " + players[i].teamName);

            card.append(gif, name, teamName);
            li.append(card);
            cardDiv.append(li);
        }
        else if (players[i].ppg > 21) {
            var cardDiv = $("#cardsGoHere");
            var li = $("<li>").attr("data-rarity", "rare");
            var card = $("<div>").addClass("uk-card uk-card-default uk-card-body rare");
            var gif = $("<img>").attr("src", players[i].gif);
            var name = $("<h2>").text(players[i].firstName + " " + players[i].lastName);
            var teamName = $("<p>").text("Team: " + players[i].teamName);

            card.append(gif, name, teamName);
            li.append(card);
            cardDiv.append(li);
        }
        else {
            var cardDiv = $("#cardsGoHere");
            var li = $("<li>").attr("data-rarity", "common");
            var card = $("<div>").addClass("uk-card uk-card-default uk-card-body common");
            var gif = $("<img>").attr("src", players[i].gif);
            var name = $("<h2>").text(players[i].firstName + " " + players[i].lastName);
            var teamName = $("<p>").text("Team: " + players[i].teamName);

            card.append(gif, name, teamName);
            li.append(card);
            cardDiv.append(li);
        }

    }
})




