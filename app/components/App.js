import React, { Component } from 'react';
import { Route } from 'react-router';
import { CreateProfile } from './CreateProfile';

export default class App extends Component {

  render() {
    return (
      <div className='App'>
        <p>
          We are going to now talk to the GitHub API. Ready?
          <a href='/authenticate'>CLICK ME!</a>
        </p>
        <CreateProfile />
      </div>
    )
  }
}
