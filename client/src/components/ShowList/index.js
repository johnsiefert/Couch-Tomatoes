import React, { useState, useEffect } from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

function ShowList() {
  const [displayShows, setDisplayShows] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [width, setWidth] = useState('580px');
  
  const loggedIn = Auth.loggedIn();

  const popularURL = 'https://api.themoviedb.org/3/tv/popular?api_key=' + process.env.REACT_APP_API_KEY;
  const searchURL = 'https://api.themoviedb.org/3/search/tv?api_key='+ process.env.REACT_APP_API_KEY + '&query=' + searchText;

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
        year: show.first_air_date,
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
      className="d-flex justify-content-around mb-3"
      onSubmit={handleSearch}
      >
        <input
        placeholder="Search for a TV show!"
        value={searchText}
        className="form-input col-7"
        onChange={handleChange}
        ></input>
        <button className="btn btn-danger col-2" type="submit">Submit</button>
      </form>
      {displayShows.map((show) => {
        return (
          <div className="d-flex justify-content-around">
            <Link to={`show/${show.tvId}`} className="text-decoration-none" style={{width}}>
              <div class="card my-3" style={{width}} key={show.tvId}>
                <div className="card-horizontal">
                  <div className="col-lg-4">
                    <img class="image-fluid" src={`https://image.tmdb.org/t/p/w200${show.image}`}/>
                  </div>
                  <div class="card-body text-secondary">
                    <h4 class="card-title ">{show.title}</h4>
                    <p class="card-text text-muted">{show.year.split('-', 1)}</p>
                    <p class="card-text">{show.description.length <= 280 ? show.description : show.description.slice(0, 280) + " (...)"}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )
      })}
    </>
  );
};

export default ShowList;
