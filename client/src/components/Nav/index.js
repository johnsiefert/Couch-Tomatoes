import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

function Nav() {

  return (
    <nav>
      <ul>
        <li><a>Home</a></li>
        <li><a>Login/Signup</a></li>
        <li><a>Profile</a></li>
      </ul>
    </nav>
  );
};

export default Nav;
