import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

function Nav() {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  const loggedIn = Auth.loggedIn();

  return (
    <header className="bg-warning mb-3">
      <div className="d-flex justify-content-between align-items-center">
        <Link to="/" className="text-decoration-none">
          <h1 className="ms-3 text-secondary">Couch Tomatoes</h1>
        </Link>

        <nav className="d-flex justify-content-between me-3">
          {loggedIn ? (
            <>
              <Link to="/profile" className="text-decoration-none">
                <p className="me-3 fs-4 text-secondary">Me</p>  
              </Link>
              <a href="/" onClick={logout} className="text-decoration-none fs-4 text-secondary">Logout</a>
            </>
          ) : (
            <>
              <Link to="/loginSignup" className="text-decoration-none text-secondary fs-4">Login/Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Nav;
