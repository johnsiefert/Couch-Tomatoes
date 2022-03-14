let userInput;
let showName;
const APIkey = 'a5bd1c7f91c8838824076a261e81c7c0';

// calls TMDB API, returning top 10 most popular results, then displays them on the page -- need to get id from this and submit a second API call to get more relevant info such as the image
const searchForShows = function(userInput) {
  let URL = 'https://api.themoviedb.org/3/search/tv?api_key='+ APIkey + '&query=' + userInput;

  fetch(URL).then(res => {
    return res.json();
  }).then(function(data) {
    console.log(data);
    for (let i = 0; i < 10; i++) {
      showName = data.results[i].name;
      showSummary = data.results[i].overview;
      showYear = data.results[i].first_air_date.split('-', 1);
      showId = data.results[i].id;
      showPoster = data.results[i].poster_path;

      if (showSummary.length > 280) {
        showSummary = showSummary.slice(0, 280) + " (... click to read more)";
      };

      let titleEl = $("<p>").attr("id", showId).addClass("showTitle").text( ( i + 1 ) + '.) ' + showName + " (" + showYear + ")" );
      let imgEl = $("<img>").attr("src", "https://image.tmdb.org/t/p/w200" + showPoster);
      let summaryEl = $("<p>").text("Summary: " + showSummary);

      $("#results").append(titleEl, imgEl, summaryEl, '<hr>');
    };
  });
};

// event listener for show search button
$("#submit").on("click", function(e) {
  e.preventDefault();

  userInput = $("#search").val();
  searchForShows(userInput);
});
