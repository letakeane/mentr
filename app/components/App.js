import React, { Component } from 'react';
import { CreateProfile } from './CreateProfile';
import { Header } from './Header.js';
import { Callback } from './Callback.js';
import { Dummy } from './Dummy.js';
import AddMentor from './AddMentor';
import { Route, Link, Switch, BrowserRouter } from 'react-router-dom';


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
    const codeParam = this.props.location.search;
    const githubAuthCode = codeParam.split("=")[1];
    return (
      <div className='App'>
        <Header logStatus={this.state.logStatus} setLogStatus = {this.setLogStatus} />
        <Switch>
          <Route path="/callback" render={(props) => <Callback code={githubAuthCode} /> }/>

          <Route path='/dummy' component={Dummy} />
        </Switch>
        <CreateProfile />
        <AddMentor updateMentors={this.updateMentors} />
      </div>
    )
  }
}

