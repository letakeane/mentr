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

    this.updateMentors = this.updateMentors.bind(this);
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

  updateMentors(mentors) {
    this.setState({ mentors: [mentors]})
    console.log(this.state);
  }


  render() {
    return (
      <div className='App'>
        <Header logStatus={this.state.logStatus} setLogStatus = {this.setLogStatus} />
        <CreateProfile />
        <AddMentor updateMentors={this.updateMentors} />
      </div>
    )
  }
}
