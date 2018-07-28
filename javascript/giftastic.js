
var movies = ["60s Movies", "70s Movies", "80s Movies", "90s Movies"];

function renderButtons() {
  $("#buttons-view").empty();

  for (var i = 0; i < movies.length; i++) {
    var a = $("<button>");
    a.addClass("moviebutton");
    a.attr("data-person", movies[i]);
     a.text(movies[i]);
    $("#buttons-view").append(a);
  }
}
$("#add-movie").on("click", function (event) {
  event.preventDefault();

var movie = $("#movie-input").val().trim();
  movies.push(movie);

  renderButtons();
});

renderButtons();

$(".moviebutton").on("click", function() {
  var movie = $(this).attr("data-person");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    movie + "&api_key=OvVCwpI3oNsTtEMZrqkRfgzGGboHqmzT";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var movieImage = $("<img>");
        movieImage.attr("src", results[i].images.fixed_height.url);

        gifDiv.prepend(p);
        gifDiv.prepend(movieImage);

        $("#gifs-appear-here").prepend(gifDiv);
      }
    });
  });          
  $("#movies").on("click", function() {

    var state = $(this).attr("data-state");
      if (state === "still") {
      $(this).attr("movie", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("movie", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });  


