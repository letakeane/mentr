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
        gh_id: this.props.user.ghId,
        avatar_url: this.props.user.avatar_url,
        program_id: 1
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
      props.history.replace('/student-profile');
    })
    .catch(error => {
      this.setState({
        errorStatus: 'Error adding student'
      })
    })
  }


  render() {
console.log('student props: ', this.props);
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
              required
            />
          </label>
          <label>
            Cohort
            <select
              name='program_id'
              onChange={event => this.updateProperty(event)}
              required
            >
              <option value='1'>Front End Mod 1</option>
              <option value='2'>Front End Mod 2</option>
              <option value='3'>Front End Mod 3</option>
              <option value='4'>Front End Mod 4</option>
              <option value='5'>Back End Mod 1</option>
              <option value='6'>Back End Mod 2</option>
              <option value='7'>Back End Mod 3</option>
              <option value='8'>Back End Mod 4</option>
            </select>
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
              required
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
