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

  // login(code) {
  //   // const url = `https://slack.com/api/oauth.access?client_id=${AUTH.clientId}&client_secret=${AUTH.clientSecret}&code=${code}&redirect_uri=http://localhost:3000/callback&pretty=1`;
  //   if(!code) {
  //     console.log('no code')
  //     return
  //   }
  //   console.log(code, 'code before login url')
  //   // const url = `https://github.com/login/oauth/access_token?client_id=5a67289f9670bc02530b&client_secret=b5e285e8796c7a511070352d888dfe8a4d8316f3&code=${code}`
  //   fetch('/gh_auth', {
  //     body: JSON.stringify(code)
  //     //  headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "localhost:1701"}
  //   })
  //   .then(resp => {
  //     console.log(resp, ' response maybe')
  //   } )
  // }


  render() {
    const codeParam = this.props.location.search;
    const githubAuthCode = codeParam.split("=")[1];
    // this.login(githubAuthCode)
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

          // {/*<Route path='/callback' component={Callback} />*/}