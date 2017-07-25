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
    this.setAppState = this.setAppState.bind(this)
  }

  setAppState() {
    if (this.state.logStatus === false) {
      this.setState({ logStatus: true });
      this.setState({ userProfile: JSON.parse(localStorage.getItem('profile')) });
    } else {
      this.setState({ logStatus: false });
      this.setState({ userProfile: {} });
    }
  }

  componentDidMount() {
    this.setAppState();
  }

  render() {
    return (
      <div className='App'>
        <Header logStatus={this.state.logStatus} setAppState={this.setAppState} />
        <CreateProfile />
      </div>
    )
  }
}

        // <p>
        //   We are going to now talk to the GitHub API. Ready?
        //   <a href='/authenticate'>CLICK ME!</a>
        // </p>
