import React, { useState, useEffect } from 'react';
const APIkey = 'a5bd1c7f91c8838824076a261e81c7c0';

function ShowList() {
  // create state for holding returned google api data
  const [displayShows, setDisplayShows] = useState([]);

  useEffect(() => {
    const URL = 'https://api.themoviedb.org/3/tv/popular?api_key=' + APIkey;

    fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      let showsArray = [];
      for (let i = 0; i < 10; i++) {
        showsArray.push(data.results[i]);
      }
      const showData = showsArray.map((item, ) => ({
        showName: item.name,
        showSummary: item.overview,
        showYear: item.first_air_date.split('-', 1),
        showId: item.id,
        showPoster: item.poster_path
      }));
      
      setDisplayShows(showData);
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <>
      {displayShows.map((show) => {
        return ( 
        <div key={show.showId}>
          <p id={show.showId}>{show.showName} {`(${show.showYear})`}</p>
          <img src={`https://image.tmdb.org/t/p/w200${show.showPoster}`}></img>
          <p>{show.showSummary.length <= 280 ? show.showSummary : show.showSummary.slice(0, 280) + " (...)"}</p>
        </div>
        )
      })}
    </>
  );
};

export default ShowList;
