import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ShowList() {
  const [displayShows, setDisplayShows] = useState([]);
  const [searchText, setSearchText] = useState('');
  
  // move API key to environment variable before deployment
  const APIkey = 'a5bd1c7f91c8838824076a261e81c7c0';
  let popularURL = 'https://api.themoviedb.org/3/tv/popular?api_key=' + APIkey;
  let searchURL = 'https://api.themoviedb.org/3/search/tv?api_key='+ APIkey + '&query=' + searchText;

  const handleChange = event => {
    setSearchText(event.target.value);
  };
  
  const handleSearch = async event => {
    event.preventDefault();

    try {
      fetch(searchURL)
      .then((res) => res.json())
      .then((data) => {
        let showsArray = [];
        for (let i = 0; i < 10; i++) {
          if (data.results[i] === undefined ) {
            break;
          }
          showsArray.push(data.results[i]);
        };
        
        const showData = showsArray.map((show) => ({
          title: show.name,
          description: show.overview,
          year: "original air date: " + show.first_air_date,
          tvId: show.id,
          image: show.poster_path
        }));
        
        setDisplayShows(showData);
      })
      .catch(err => console.log(err));
      setSearchText('');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {

    fetch(popularURL)
    .then((res) => res.json())
    .then((data) => {
      let showsArray = [];
      for (let i = 0; i < 10; i++) {
        showsArray.push(data.results[i]);
      }
      const showData = showsArray.map((show) => ({
        title: show.name,
        description: show.overview,
        year: "original air date: " + show.first_air_date,
        tvId: show.id,
        image: show.poster_path
      }));
      
      setDisplayShows(showData);
    })
    .catch(err => console.log(err));
  }, []);
  
  return (
    <>
      <form
      className="flex-row justify-center justify-space-between-md align-stretch"
      onSubmit={handleSearch}
      >
        <input
        placeholder="Search a TV show!"
        value={searchText}
        className="form-input col-12 col-md-9"
        onChange={handleChange}
        ></input>
        <button className="btn col-12 col-md-3" type="submit">Submit</button>
      </form>
      {displayShows.map((show) => {
        return ( 
        <div key={show.tvId}>
          <Link to={`show/${show.tvId}`}>
            <div className="d-flex">
              <p id={show.tvId}>{show.title}{` - `}</p>
              <p>{` - `}{show.year}</p>
            </div>
            <div className="d-flex">
              <img src={`https://image.tmdb.org/t/p/w200${show.image}`} className="me-3"></img>
              <p>{show.description.length <= 280 ? show.description : show.description.slice(0, 280) + " (...)"}</p>
            </div>
            <br />
          </Link>
        </div>
        )
      })}
    </>
  );
};

export default ShowList;
