import React, { useState, useEffect } from 'react';

function SingleShow() {
  const tvId = window.location.toString().split('/').pop();
  // move API key to environment variable before deployment
  const APIkey = 'a5bd1c7f91c8838824076a261e81c7c0';

  const [displayShow, setDisplayShow] = useState([]);

  useEffect(() => {
    const URL = 'https://api.themoviedb.org/3/tv/' + tvId + '?api_key=' + APIkey;

    fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      const showData = [{
        title: data.name,
        description: data.overview,
        year: data.first_air_date.split('-', 1).toString(),
        tvId: data.id,
        image: data.poster_path
      }];
      
      setDisplayShow(showData);
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <>
      {displayShow.map((show) => {
        return ( 
        <div key={show.tvId}>
          <p id={show.tvId}>{show.title} {`(${show.year})`}</p>
          <img src={`https://image.tmdb.org/t/p/w200${show.image}`}></img>
          <p>{show.description}</p>
        </div>
        )
      })}
    </>
  );
};

export default SingleShow;
