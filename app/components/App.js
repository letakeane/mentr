import React, { Component } from 'react';
// import { CreateProfile } from './CreateProfile';
import { Header } from './Header.js';
import { Callback } from './Callback.js';
import { Dummy } from './Dummy.js';
import { StudentHome } from './StudentHome.js';
import { MentorHome } from './MentorHome.js';
import { ChooseStatus } from './ChooseStatus.js';
import EditMentor from './EditMentor';
import { Route, Link, Switch, BrowserRouter } from 'react-router-dom';
import AddStudent from './AddStudent';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      githubAuthCode: undefined,
      user: undefined,
      matchingMentors: []
    }
    this.mentors = [];
    this.updateMentors = this.updateMentors.bind(this);
    this.setUser = this.setUser.bind(this);
    this.getFilteredMentors = this.getFilteredMentors.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  clearState() {
    this.props.history.replace('/');
    this.setState({
      matchingMentors: [],
      githubAuthCode: undefined,
      user: undefined
    })
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

  getAllMentors() {
    fetch('/api/v1/mentors')
    .then(response => response.json())
    .then(data => {
      this.mentors = data;
    });
  }

  componentDidMount() {
    this.setAppState();
    this.getAllMentors();
  }

  updateMentors(mentors) {
    this.setState({ mentors: [mentors]})
    console.log(this.state);
  }

  setUser(user) {
    this.setState({ user });
  }

  getFilteredMentors(e, searchParams, setSelectedKeys, filterMentors) {
    e.preventDefault();
    // const { searchParams } = this.state;

    let selectedKeys = setSelectedKeys(searchParams);

    const searchedMentors = filterMentors(selectedKeys, searchParams);
  console.log(searchedMentors, 'searched mentors at the end')
    this.setState({
      matchingMentors: searchedMentors
    });
  }

  render() {
    const { user, githubAuthCode, matchingMentors } = this.state;
    const { history } = this.props;

    return (
      <div className='App'>
        <Header
          user={user}
          clearState={this.clearState} />
        <Switch>
          <Route path="/callback" render={(props) => <Callback
              setUser={this.setUser}
              user={user}
              history={history}
              code={githubAuthCode} /> }/>
          <Route path='/student-profile' render={(props) => <StudentHome
            user={user}
            mentors={this.mentors}
            matchingMentors={matchingMentors}
            getFilteredMentors={this.getFilteredMentors} />}/>
          <Route path='/mentor-profile' render={(props) => <MentorHome user={user} />}/>
          <Route path='/choose-status' render={(props) => <ChooseStatus user={user} />}/>
          <Route path='/create-student' render={(props) => <AddStudent user={user} history={history} />}/>
          <Route path='/edit-mentor' render={(props) => <EditMentor user={user} updateMentors={this.updateMentors} history={history} />}/>

        </Switch>

      </div>
    )
  }
}
