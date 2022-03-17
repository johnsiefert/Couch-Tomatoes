import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });
  const user = data?.me || data?.user || {};

  // redirect to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />
  }

  if (loading) {
    return <div>Loading...</div>
  };

  if (!user?.username) {
    return (
      <h4>Login in to see this page!</h4>
    );
  };

  return (
    <main className="min-vh-100">
      <div className="flex-row mb-3">
        <h2 className="bg-danger text-light p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile
        </h2>
      </div>

      <div className="flex-row justify-space-between mb-3">
        {/* savedTv would be displayed here */}
      </div>
    </main>
  );
};

export default Profile;
