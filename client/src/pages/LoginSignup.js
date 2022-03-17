import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_USER, LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const LoginSignup = () => {
  const [loginFormState, setLoginFormState] = useState({ email: '', password: '' });
  const [signupFormState, setSignupFormState] = useState({ username: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);
  const [login, { err }] = useMutation(LOGIN_USER);

  const handleLoginChange = (event) => {
    const { name, value } = event.target;

    setLoginFormState({
      ...loginFormState,
      [name]: value,
    });
  };

  const handleSignupChange = (event) => {
    const { name, value } = event.target;

    setSignupFormState({
      ...signupFormState,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...loginFormState }
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...signupFormState }
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className='d-flex justify-content-around min-vh-100'>
      <div className='col-5'>
        <div className='card mb-3'>
          <h4 className='card-header'>Login</h4>
          <div className='card-body d-flex'>
            <form onSubmit={handleLoginSubmit} className="d-block justify-content-around">
              <input
                className='form-input d-block my-3'
                placeholder='email'
                name='email'
                type='email'
                id='loginEmail'
                value={loginFormState.email}
                onChange={handleLoginChange}
              />
              <input
                className='form-input d-block my-3'
                placeholder='******'
                name='password'
                type='password'
                id='loginPassword'
                value={loginFormState.password}
                onChange={handleLoginChange}
              />
              <button className='btn btn-danger' type='submit'>
                Login!
              </button>
            </form>
            {err && <div>Login failed</div>}
          </div>
        </div>
      </div>
      <div className='col-5'>
        <div className='card mb-3'>
          <h4 className='card-header'>Signup</h4>
          <div className='card-body'>
          <form onSubmit={handleSignupSubmit}>
              <input
                className='form-input d-block my-3'
                placeholder='username'
                name='username'
                type='username'
                id='username'
                value={signupFormState.username}
                onChange={handleSignupChange}
              />
              <input
                className='form-input d-block my-3'
                placeholder='email'
                name='email'
                type='email'
                id='signupEmail'
                value={signupFormState.email}
                onChange={handleSignupChange}
              />
              <input
                className='form-input d-block my-3'
                placeholder='******'
                name='password'
                type='password'
                id='signupPassword'
                value={signupFormState.password}
                onChange={handleSignupChange}
              />
              <button className='btn btn-danger' type='submit'>
                Signup!
              </button>
            </form>
            {error && <div>Signup failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginSignup;
