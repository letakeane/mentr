import React, { Component } from 'react';
import { Route } from 'react-router';
import MentorCard from './MentorCard';

export default class MentorHome extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentMentor: {}
    }
  }

  getCurrentMentor() {
    const { ghId } = this.props.user;
    fetch(`/api/v1/mentors/${ghId}`)
    .then(response => response.json())
    // .then(mentor => {
      // console.log(mentor[0]);
      // this.setState({
      //   currentMentor: mentor[0]
      // })
    // })
    .then(mentor => console.log(mentor[0]))
    .catch(error => console.log(error))
  }

  componentDidMount() {
    setTimeout(() => {
      this.getCurrentMentor();
    }, 2000)
  }


  render() {
    return (
      <div>
        <MentorCard mentor={this.state.currentMentor} />
      </div>
    )
  }
}
