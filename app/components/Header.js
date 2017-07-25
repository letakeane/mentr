import React, { Component } from 'react';
import { lock } from '../../lock.js';

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
        <button
          id='log-in'
          onClick={() => {
            lock.show();
            logIn();
          }
        }>LOG IN</button>
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
