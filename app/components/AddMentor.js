import React, { Component } from 'react';
import { Route } from 'react-router';

export default class AddMentor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mentor: {
        location: '',
        preferred_contact: '',
        preferred_name: '',
        slack: '',
        email: '',
        phone: '',
        accepting_new: '',
        availability: '',
        company: '',
        position: '',
        dev_type: '',
        stack: '',
        pairing_location: ''
      },
      errorStatus: ''
    };
  }

  updateProperty(event) {
    const { name, value } = event.target;
    this.setState({
      mentor: Object.assign(this.state.mentor, {
        [name]: value
      })
    })
    console.log(this.state);
  }

  addMentor(event) {
    event.preventDefault();
    const { updateMentors } = this.props;
    const mentor = this.state.mentor;

    fetch('/api/v1/mentors', {
      method: 'POST',
      body: JSON.stringify(mentor),
      headers: {
        'CONTENT-TYPE': 'application/json'
      }
    })
    .then(response => response.json())
    .then(mentors => {
      this.setState({
        mentor: {
          location: '',
          preferred_contact: '',
          preferred_name: '',
          slack: '',
          email: '',
          phone: '',
          accepting_new: '',
          availability: '',
          company: '',
          position: '',
          dev_type: '',
          stack: '',
          pairing_location: ''
        }
      }, updateMentors(mentors));
    })
    .catch(error => {
      this.setState({
        errorStatus: 'Error adding mentor'
      })
    })
  }

  render() {
    return (
      <form
        onSubmit={event => this.addMentor(event)}
        >
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={this.state.location}
          onChange={event => this.updateProperty(event)}
        />
        {/* <input
          type="text"
          name="preferred_contact"
          placeholder="Preferred Contact"
          value={this.state.preferred_contact}
          onChange={event => this.updateProperty(event)}
        />
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
          name="phone"
          placeholder="Phone Number"
          value={this.state.phone}
          onChange={event => this.updateProperty(event)}
        />
        <input
          type="text"
          name="accepting_new"
          placeholder="Are you accepting new"
          value={this.state.accepting_new}
          onChange={event => this.updateProperty(event)}
        />
        <input
          type="text"
          name="availability"
          placeholder="Availability"
          value={this.state.availability}
          onChange={event => this.updateProperty(event)}
        />
        <input
          type="text"
          name="company"
          placeholder="Current Company"
          value={this.state.company}
          onChange={event => this.updateProperty(event)}
        />
        <input
          type="text"
          name="position"
          placeholder="Current Position"
          value={this.state.position}
          onChange={event => this.updateProperty(event)}
        />
        <input
          type="text"
          name="dev_type"
          placeholder="Type of Developer"
          value={this.state.dev_type}
          onChange={event => this.updateProperty(event)}
        />
        <input
          type="text"
          name="stack"
          placeholder="Stack Knowledge"
          value={this.state.stack}
          onChange={event => this.updateProperty(event)}
        />
        <input
          type="text"
          name="pairing_location"
          placeholder="Pairing Locations"
          value={this.state.pairing_location}
          onChange={event => this.updateProperty(event)}
        /> */}
        <input
          type="submit"
          value="Create Mentor"
        />
      </form>
    )
  }
}
