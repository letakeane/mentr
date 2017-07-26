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
      <form
        onSubmit={event => this.addStudent(event)}
        >
        <input
          type="text"
          name="preferred_name"
          placeholder="Preferred Name"
          value={this.state.preferred_name}
          onChange={event => this.updateProperty(event)}
        />
        <input
          type="text"
          name="slack"
          placeholder="Slack Handle"
          value={this.state.slack}
          onChange={event => this.updateProperty(event)}
        />
        <input
          type="text"
          name="email"
          placeholder="Email Address"
          value={this.state.email}
          onChange={event => this.updateProperty(event)}
        />
        <input
          type="text"
          name="stack_interests"
          placeholder="Stack Interests"
          value={this.state.stack_interests}
          onChange={event => this.updateProperty(event)}
        />
        <input
          type="submit"
          value="Create Student"
        />
      </form>
    )
  }
}
