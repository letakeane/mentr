import React, { Component } from 'react';
import { Route } from 'react-router';
import { CreateProfile } from './CreateProfile';
import { Header } from './Header.js';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      logStatus: false,
      userProfile: {}
    }
    this.setLogStatus = this.setLogStatus.bind(this)
  }

  setLogStatus() {
    const token = localStorage.getItem('accessToken');
    const setStatus = () => {
      if (token) {
        if (logStatus === false) {
          this.setState({ logStatus: true });
        }
      } else {
        this.setState({ logStatus: false })
      }
    }
  }

  setUserProfile() {
    if (this.state.logStatus === true) {
      profileData = JSON.parse(localStorage.getItem('profile'));
      this.setState({ userProfile: profileData });
    }
  }


  render() {
    return (
      <div className='App'>
        <Header logStatus={this.state.logStatus} setLogStatus = {this.setLogStatus} />
        <CreateProfile />
      </div>
    )
  }
}

        // <p>
        //   We are going to now talk to the GitHub API. Ready?
        //   <a href='/authenticate'>CLICK ME!</a>
        // </p>
