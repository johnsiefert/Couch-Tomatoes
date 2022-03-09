let userInput = '';
let results = [];
let showName;
let showNames = [];
let APIkey = 'a5bd1c7f91c8838824076a261e81c7c0';

// calls TMDB API, returning top 10 most popular results, then displays them on the page -- need to get id from this and submit a second API call to get more relevant info such as the image
const fetchAndDisplayShows = function(userInput) {
  let dbURL = 'https://api.themoviedb.org/3/search/tv?api_key='+ APIkey + '&query=' + userInput;
  console.log(userInput);

  fetch(dbURL).then(res => {
    return res.json();
  }).then(function(data) {
    console.log(data);
    for (let i = 0; i < 10; i++) {
      showName = data.results[i].name;
      showSummary = data.results[i].overview;
      showYear = data.results[i].first_air_date.split('-', 1);

      if (showSummary.length > 280) {
        showSummary = showSummary.slice(0, 280) + " (... click to read more)";
      };

      var titleEl = $("<p>").text( ( i + 1 ) + '.) ' + showName + " (" + showYear + ")" );
      let summaryEl = $("<p>").text("Summary: " + showSummary);

      $("#results").append(titleEl, summaryEl, '<hr>');
    };
  });
};

// event listener for show search button
$("#submit").on("click", function(e) {
  e.preventDefault();

  userInput = $("#search").val();
  fetchAndDisplayShows(userInput);
});
