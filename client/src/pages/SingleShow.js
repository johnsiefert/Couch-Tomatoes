import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_COMMENTS } from '../utils/queries';
import Auth from '../utils/auth';

import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

function SingleShow() {
  const tvId = window.location.toString().split('/').pop();

  const [displayShow, setDisplayShow] = useState([]);

  const { loading, data } = useQuery(QUERY_COMMENTS);

  const comments = data?.comments || [];
  const loggedIn = Auth.loggedIn();

  useEffect(() => {
    const URL = 'https://api.themoviedb.org/3/tv/' + tvId + '?api_key=' + process.env.REACT_APP_API_KEY;

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
          <div class="card my-3" key={show.tvId}>
            <div className="card-horizontal">
              <div className="col-lg-4">
                <img class="image-fluid" src={`https://image.tmdb.org/t/p/w300${show.image}`}/>
              </div>
              <div class="card-body">
                <h2 class="card-title ">{show.title}</h2>
                <p class="card-text text-muted">{show.year.split('-', 1)}</p>
                <p class="card-text">{show.description.length <= 280 ? show.description : show.description.slice(0, 280) + " (...)"}</p>
                {loggedIn && <button className="btn-danger my-1">Add Show</button>}
              </div>
            </div>
          </div>
        )
      })}

      <div className="flex-row justify-space-between">
      {loggedIn && (
        <div className="col-12 mb-3">
          <CommentForm />
        </div>
      )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <CommentList
            comments={comments}
            title="Some Feed for Comment(s)..."
          />

        )}
        </div>
      </div>
    </>
  );
};

export default SingleShow;
