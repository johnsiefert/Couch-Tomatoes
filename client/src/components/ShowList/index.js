import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ShowList() {
  const [displayShows, setDisplayShows] = useState([]);
  // move API key to environment variable before deployment
  const APIkey = 'a5bd1c7f91c8838824076a261e81c7c0';

  useEffect(() => {
    const URL = 'https://api.themoviedb.org/3/tv/popular?api_key=' + APIkey;

    fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      let showsArray = [];
      for (let i = 0; i < 10; i++) {
        showsArray.push(data.results[i]);
      }
      const showData = showsArray.map((show, ) => ({
        title: show.name,
        description: show.overview,
        year: show.first_air_date.split('-', 1),
        tvId: show.id,
        image: show.poster_path
      }));
      
      setDisplayShows(showData);
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <>
      {displayShows.map((show) => {
        return ( 
        <div key={show.tvId}>
          <Link to={`show/${show.tvId}`}>
            <p id={show.tvId}>{show.title} {`(${show.year})`}</p>
            <img src={`https://image.tmdb.org/t/p/w200${show.image}`}></img>
            <p>{show.description.length <= 280 ? show.description : show.description.slice(0, 280) + " (...)"}</p>
          </Link>
        </div>
        )
      })}
    </>
  );
};

export default ShowList;
