import React, { Component } from 'react';
// import { lock } from '../../lock.js';
export const Header = ({ logStatus, setLogStatus }) => {
  const logInOut = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setLogStatus();
      return (
        <button id='log-out'>LOG OUT</button>
      )
    } else {
      return (
        <div>
        <a id="addToSlackBtn" href="http://github.com/login/oauth/authorize?client_id=5a67289f9670bc02530b&redirect_uri=http://localhost:1701/callback">login</a>
        </div>
      )
    }
    return;
  }

  return (
    <div className='app-header'>
      {logInOut()}
    </div>
  )
}
