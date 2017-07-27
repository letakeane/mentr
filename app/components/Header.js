import React, { Component } from 'react';

export const Header = ({ logStatus, setAppState }) => {
  const logOut = () => {
    localStorage.clear();
    setAppState();
  }

  const logIn = () => {
    setAppState();
  }

  const logInOut = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      return (
        <button id='log-out' onClick={() => logOut()}>LOG OUT</button>
      )
    } else {
      return (
        <div>
          <div>
            <a id="addToSlackBtn" href="http://github.com/login/oauth/authorize?client_id=5a67289f9670bc02530b&redirect_uri=http://localhost:1701/callback">login for Auth0</a>
          </div>
          <button
            id='log-in'
            onClick={() => {
              lock.show();
              logIn();
            }
          }>LOG IN</button>
        </div>
      )
    }
    return;
  }

  return (
    <div className='app-header'>
      <h1>mentr</h1>
      {logInOut()}
    </div>
  )
}
