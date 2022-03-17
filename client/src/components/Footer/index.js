import React, { useState } from 'react';
import TMDBlogo from '../../TMDBlogo.svg';

const Footer = () => {
  const [width, setWidth] = useState('300px');

  return (
    <footer className="w-100 mt-auto bg-warning p-4 d-flex justify-content-between align-items-center">
      <div>Created by John & David</div>
      <div style={{width}}>
        <a href="https://www.themoviedb.org/" target="_blank" className="text-decoration-none d-flex align-items-center">
          <p className="me-3">All TV show data provided via The Movie Database API</p>
          <img src={TMDBlogo} width="100px"/>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
