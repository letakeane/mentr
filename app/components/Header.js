import React, { Component } from 'react';
import { lock } from '../../lock.js';

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
        <button
          id='log-in'
          onClick={() => {
            lock.show();
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
