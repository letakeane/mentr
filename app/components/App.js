import React, { Component } from 'react';
// import { CreateProfile } from './CreateProfile';
import { Header } from './Header.js';
import { Callback } from './Callback.js';
import { Dummy } from './Dummy.js';
import { StudentHome } from './StudentHome.js';
import { MentorHome } from './MentorHome.js';
import { ChooseStatus } from './ChooseStatus.js';
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
      user: undefined
    }
    this.updateMentors = this.updateMentors.bind(this);
    this.setUser = this.setUser.bind(this);
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

  setUser(user) {
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <div className='App'>
        <Header logStatus={this.state.logStatus} setLogStatus = {this.setLogStatus} />
        <Switch>
          <Route path="/callback" render={(props) => <Callback 
              setUser={this.setUser}
              user={user}
              history={this.props.history}
              code={this.state.githubAuthCode} /> }/>
          <Route path='/student-profile' render={(props) => <StudentHome user={user} />}/>
          <Route path='/mentor-profile' render={(props) => <MentorHome user={user} />}/>
          <Route path='/choose-status' render={(props) => <ChooseStatus user={user} />}/>
          <Route path='/create-student' render={(props) => <AddStudent user={user} updateStudents={this.updateStudents} />}/>
          <Route path='/create-mentor' render={(props) => <AddMentor user={user} updateMentors={this.updateMentors} />}/>

        </Switch>
        
      </div>
    )
  }
}



    //select from students where ghid = response id
       //if id then take them to their home page
       // if no id then select from mentors where ghid = response id
       // if no id then direct them to sign up