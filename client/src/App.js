import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';

import Nav from './components/Nav';
import Footer from './components/Footer';

import Home from './pages/Home';
import LoginSignup from './pages/LoginSignup';
import Profile from './pages/Profile';
import SingleShow from './pages/SingleShow';
import NoMatch from './pages/NoMatch';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Nav />
          <div className='container'>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/loginSignup" component={LoginSignup} />
              <Route exact path="/profile/:username?" component={Profile} />
              <Route exact path="/show/:id" component={SingleShow} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        <Footer />
      </Router>
    </ApolloProvider>
  );
};

export default App;
