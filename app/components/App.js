import React, { Component } from 'react';
import { Route } from 'react-router';
import { CreateProfile } from './CreateProfile';
import { Header } from './Header.js';
import AddMentor from './AddMentor';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      mentors: [],
      students: [],
      logStatus: false,
      userProfile: {}
    }
    this.setAppState = this.setAppState.bind(this)
    this.updateMentors = this.updateMentors.bind(this);
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

  updateMentors(mentors) {
    this.setState({ mentors: [mentors]})
    console.log(this.state);
  }

  render() {
    return (
      <div className='App'>
        <Header logStatus={this.state.logStatus} setAppState={this.setAppState} />
        <CreateProfile />
        <AddMentor updateMentors={this.updateMentors} />
      </div>
    )
  }
}
