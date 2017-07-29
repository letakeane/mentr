import React, { Component } from 'react';
import { Route } from 'react-router';

export default class AddStudent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      student: {
        preferred_name: '',
        slack: '',
        email: '',
        stack_interests: '',
      },
      errorStatus: ''
    }
  }

  updateProperty(event) {
    const { name, value } = event.target;
    this.setState({
      mentor: Object.assign(this.state.student, {
        [name]: value
      })
    })
  }

  addStudent(event) {
    event.preventDefault();
    const { updateStudents } = this.props;
    const student = this.state.student;

    fetch('/api/v1/students', {
      method: 'POST',
      body: JSON.stringify(student),
      headers: {
        'CONTENT-TYPE': 'application/json'
      }
    })
    .then(response => response.json())
    .then(students => {
      this.setState({
        student: {
          preferred_name: '',
          slack: '',
          email: '',
          stack_interests: '',
        }
      }, updateStudents(students));
    })
    .catch(error => {
      this.setState({
        errorStatus: 'Error adding student'
      })
    })
  }


  render() {
    return (
      <div>
        <h2>Create a Student</h2>
        <form
          onSubmit={event => this.addStudent(event)}
          >
          <label>
            Preferred Name
            <input
              type="text"
              name="preferred_name"
              placeholder="Preferred Name"
              value={this.state.preferred_name}
              onChange={event => this.updateProperty(event)}
            />
          </label>
          <label>
            Slack Handle
            <input
              id="profile-slack"
              type="text"
              name="slack"
              placeholder="Slack Handle"
              value={this.state.slack}
              onChange={event => this.updateProperty(event)}
            />
          </label>
          <label>
            Email Address
            <input
              id="profile-email"
              type="email"
              name="email"
              placeholder="email@youremail.com"
              value={this.state.email}
              onChange={event => this.updateProperty(event)}
            />
          </label>
          <label>
            Stack Interests
            <input
              type="text"
              name="stack_interests"
              placeholder="Stack Interests"
              value={this.state.stack_interests}
              onChange={event => this.updateProperty(event)}
            />
          </label>
          <input
            type="submit"
            value="Create Student"
          />
        </form>
      </div>
    )
  }
}
