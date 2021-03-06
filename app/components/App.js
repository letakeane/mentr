import React, { Component } from 'react';
import { Header } from './Header.js';
import { Callback } from './Callback.js';
import { StudentHome } from './StudentHome.js';
import MentorHome from './MentorHome.js';
import { ChooseStatus } from './ChooseStatus.js';
import EditMentor from './EditMentor';
import { Route, Link, Switch, BrowserRouter } from 'react-router-dom';
import EditStudent from './EditStudent';
import MentorCard from './MentorCard';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      githubAuthCode: undefined,
      user: undefined,
      matchingMentors: [],
      currentMentor: {},
      firstMentor: undefined
    };
    this.mentors = [];
    this.updateMentors = this.updateMentors.bind(this);
    this.setUser = this.setUser.bind(this);
    this.getFilteredMentors = this.getFilteredMentors.bind(this);
    this.clearState = this.clearState.bind(this);
    this.setCurrentMentor = this.setCurrentMentor.bind(this);
  }

  clearState() {
    this.props.history.replace('/');
    this.setState({
      githubAuthCode: undefined,
      user: undefined,
      matchingMentors: [],
      currentMentor: {}
    });
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

  setCurrentMentor(currentMentor) {
    this.setState({
      currentMentor
    });
    this.props.history.replace('/mentor-profile');
  }

  getAllMentors() {
    fetch('/api/v1/mentors')
      .then(response => response.json())
      .then(data => {
        this.mentors = data;
        this.setState({
          firstMentor: data[0]
        })
      })
      .catch(error => {
        response.status(500).json({ error });
      });
  }

  componentDidMount() {
    this.setAppState();
    this.getAllMentors();
  }

  updateMentors(mentors) {
    this.setState({ mentors: [mentors]});
  }

  setUser(user) {
    this.setState({ user });
  }

  getFilteredMentors(e, searchParams, setSelectedKeys, filterMentors) {
    e.preventDefault();

    let selectedKeys = setSelectedKeys(searchParams);

    const searchedMentors = filterMentors(selectedKeys, searchParams);

    this.setState({
      matchingMentors: searchedMentors
    });
  }

  showSingleMentor(mentor) {
    if (this.props.location.pathname === '/'  && mentor) {
      return (
        <div>
          <p className='login-prompt' >*LOGIN TO SEE MORE MENTORS*</p>
          <MentorCard mentor={mentor} />
        </div>
      )
    }
    return (
      <div></div>
    )
  }

  render() {
    const { user, githubAuthCode, matchingMentors, currentMentor } = this.state;
    const { history } = this.props;

    return (
      <div className='App'>
        <Header
          user={user}
          clearState={this.clearState} />
        <Switch>
          <Route path="/callback" render={(props) => <Callback
              className='callback-'
              setUser={this.setUser}
              user={user}
              history={history}
              code={githubAuthCode} /> }/>

          <Route path='/student-profile' render={(props) => <StudentHome
            className='student-home-'
            user={user}
            mentors={this.mentors}
            matchingMentors={matchingMentors}
            getFilteredMentors={this.getFilteredMentors} />}/>
          <Route path='/mentor-profile' render={(props) => <MentorHome className='mentor-home-' user={user} currentMentor={currentMentor}/>}/>
          <Route path='/choose-status' render={(props) => <ChooseStatus className='choose-status-' user={user} />}/>
          <Route path='/edit-student' render={(props) => <EditStudent className='edit-student-' user={user} history={history} />}/>
          <Route path='/edit-mentor' render={(props) => <EditMentor className='edit-mentor-' user={user} updateMentors={this.updateMentors} history={history} setCurrentMentor={this.setCurrentMentor}/>}/>

        </Switch>
        {this.showSingleMentor(this.mentors[0])}
      </div>
    )
  }
}
