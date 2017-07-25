import React, { Component } from 'react';
import { Route } from 'react-router';
import AddMentor from './AddMentor';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      mentors: [],
      students: [],
    }

    this.updateMentors = this.updateMentors.bind(this);
  }

  updateMentors(mentors) {
    this.setState({ mentors: [mentors]})
    console.log(this.state);
  }


  render() {
    return (
      <div className='App'>
        <p>
          We are going to now talk to the GitHub API. Ready?
          <a href='/authenticate'>CLICK ME!</a>
        </p>
        <AddMentor updateMentors={this.updateMentors} />
      </div>
    )
  }
}
