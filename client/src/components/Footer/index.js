import React from 'react';
import TMDBlogo from '../../TMDBlogo.svg';

const Footer = () => {
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container">Created by Antonio, John, & David</div>
      <div><a href="https://www.themoviedb.org/" target="_blank">All TV show data provided via The Movie Database API <img src={TMDBlogo} width="100px" /></a></div>
    </footer>
  );
};

export default Footer;
