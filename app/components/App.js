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
      githubAuthCode: undefined,
      user: ''
    }
    this.updateMentors = this.updateMentors.bind(this);
  }

  setAppState() {
    const codeParam = this.props.location.search;
    const githubAuthCode = codeParam.split("=")[1];
    if (!this.state.githubAuthCode) {
      this.setState({ 
        githubAuthCode
       });
    } else {
      this.setState({ 
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



    //select from students where ghid = response id
       //if id then take them to their home page
       // if no id then select from mentors where ghid = response id
       // if no id then direct them to sign up