import React, { Component } from 'react';
// import { CreateProfile } from './CreateProfile';
import { Header } from './Header.js';
import { Callback } from './Callback.js';
import { Dummy } from './Dummy.js';
import AddMentor from './AddMentor';
import { Route, Link, Switch, BrowserRouter } from 'react-router-dom';
import AddStudent from './AddStudent';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      mentors: [],
      students: [],
      logStatus: false,
      userProfile: {},
      githubAuthCode: undefined
    }
    this.setAppState = this.setAppState.bind(this)
    this.updateMentors = this.updateMentors.bind(this);
  }

  setAppState() {
    const codeParam = this.props.location.search;
    const githubAuthCode = codeParam.split("=")[1];
    if (this.state.logStatus === false) {
      this.setState({ 
        logStatus: true,
        userProfile: JSON.parse(localStorage.getItem('profile')),
        githubAuthCode
       });
    } else {
      this.setState({ 
        logStatus: false ,
        userProfile: {},
        githubAuthCode: undefined
      });
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
    const codeParam = this.props.location.search;
    const githubAuthCode = codeParam.split("=")[1];
    console.log(githubAuthCode, 'gh auth code')
    return (
      <div className='App'>
        <Header logStatus={this.state.logStatus} setLogStatus = {this.setLogStatus} />
        <Switch>
          <Route path="/callback" render={(props) => <Callback code={this.state.githubAuthCode} /> }/>

          <Route path='/dummy' component={Dummy} />
        </Switch>

        <AddMentor updateMentors={this.updateMentors} />
        <AddStudent updateStudents={this.updateStudents} />
      </div>
    )
  }
}

       // <CreateProfile />
