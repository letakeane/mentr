import React, { Component } from 'react';
import { Route } from 'react-router';
import MentorHome from './MentorHome';

export default class EditMentor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mentor: {
        location: '',
        preferred_contact: '',
        preferred_name: '',
        slack: '',
        email: '',
        bio: '',
        phone: '',
        accepting_new: '',
        availability: '',
        company: '',
        position: '',
        dev_type: '',
        stack: '',
        pairing_location: '',
        gh_id: this.props.user.ghId,
        avatar_url: this.props.user.avatar_url
      },
      errorStatus: '',
      PATCH: false
    };
  }

  updateProperty(event) {
    const { name, value } = event.target;
    this.setState({
      mentor: Object.assign(this.state.mentor, {
        [name]: value
      })
    })
  }

  addMentor(event) {
    event.preventDefault();
    const mentor = this.state.mentor;

    if (this.state.PATCH) {
      fetch('/api/v1/mentors', {
        method: 'PATCH',
        body: JSON.stringify(mentor),
        headers: {
          'CONTENT-TYPE': 'application/json'
        }
      })
      .then(() => {
        fetch(`/api/v1/mentors/${this.state.mentor.gh_id}`)
        .then(response => response.json())
        .then(currentMentor => {
          console.log('Trying to set current mentor: ', currentMentor[0]);
          this.props.setCurrentMentor(currentMentor[0]);
        })
        .catch(error => console.log(error))
      })
      .catch(error => {
        this.setState({
          errorStatus: 'Error adding mentor'
        })
      })
    } else {
      fetch('/api/v1/mentors', {
        method: 'POST',
        body: JSON.stringify(mentor),
        headers: {
          'CONTENT-TYPE': 'application/json'
        }
      })
      .then(() => {
        fetch(`/api/v1/mentors/${this.state.mentor.gh_id}`)
        .then(response => response.json())
        .then(currentMentor => {
          console.log('Trying to set current mentor: ', currentMentor[0]);
          this.props.setCurrentMentor(currentMentor[0]);
        })
        .catch(error => console.log(error))
      })
      .catch(error => {
        this.setState({
          errorStatus: 'Error adding mentor'
        })
      })
    }
  }

  checkDatabase () {
    const { ghId } = this.props.user;

    fetch(`/api/v1/mentors/${ghId}`)
    .then(response => response.json())
    .then(mentor => {
      if (mentor.length === 1) {
        this.setState({
          mentor: Object.assign(this.state.mentor, mentor[0]),
          PATCH: true
        })
      } else {
        this.setState({ PATCH: false })
        return
      }
    })
  }

  componentWillMount() {
    this.checkDatabase()
  }

  render() {
    return (
      <div>
        <h2>Create Mentor Profile</h2>
        <form
          id="create-profile-form"
          onSubmit={event => {
            this.addMentor(event);
          }}
          >
          <label>
            Location
            <input
              id="profile-location"
              type="text"
              name="location"
              placeholder="City, State"
              value={this.state.mentor.location}
              onChange={event => this.updateProperty(event)}
            />
          </label>
          <label>
            Bio
            <textarea
              id="profile-bio"
              form="create-profile-form"
              type="textarea"
              name="bio"
              placeholder="Bio"
              value={this.state.mentor.bio}
              onChange={event => this.updateProperty(event)}
            />
          </label>
          <label>
            Preferred Method of Contact
            <div className='preferred-contact-radios'>
              <input
                type='radio'
                id='profile-prefer-slack'
                name='preferred_contact'
                value='slack'
                onChange={event => this.updateProperty(event)}
              />
              <label htmlFor='profile-prefer-slack'>Slack</label>

              <input
                id='profile-prefer-email'
                type='radio'
                name='preferred_contact'
                value='email'
                onChange={event => this.updateProperty(event)}
              />
              <label htmlFor='profile-prefer-email'>Email</label>

              <input
                id='profile-prefer-phone'
                type='radio'
                name='preferred_contact'
                value='phone'
                onChange={event => this.updateProperty(event)}
              />
              <label htmlFor='profile-prefer-phone'>Phone</label>
            </div>
          </label>
          <label>
            Preferred Name
            <input
              type="text"
              name="preferred_name"
              placeholder="Preferred Name"
              value={this.state.mentor.preferred_name}
              onChange={event => this.updateProperty(event)}
            />
          </label>
          <label>
            Slack Handle
            <input
              id="profile-slack"
              type="text"
              name="slack"
              placeholder="username"
              value={this.state.mentor.slack}
              onChange={event => this.updateProperty(event)}
            />
          </label>
          <label>
            Email address
            <input
              id="profile-email"
              type="email"
              name="email"
              placeholder="email@youremail.com"
              value={this.state.mentor.email}
              onChange={event => this.updateProperty(event)}
            />
          </label>
          <label>
            Telephone Number
            <input
              type="tel"
              pattern="[0-9\-\+\s\(\)]*$"
              name="phone"
              placeholder="555-123-4567"
              value={this.state.mentor.phone}
              onChange={event => this.updateProperty(event)}
            />
          </label>
          <label>
            Are you currently accepting new mentees?
            <div className='new-mentees-radios'>
              <input
                id='profile-new-yes'
                type='radio'
                name='accepting_new'
                value='y'
                onChange={event => this.updateProperty(event)}
              />
              <label htmlFor='profile-new-yes'>Yes</label>

              <input
                id='profile-new-no'
                type='radio'
                name='accepting_new'
                value='n'
                onChange={event => this.updateProperty(event)}
              />
              <label htmlFor='profile-new-no'>No</label>
            </div>
          </label>
          <label>
            Availability
            <textarea
              id="profile-availability"
              form="create-profile-form"
              type="textarea"
              name="availability"
              placeholder="Availability"
              value={this.state.mentor.availability}
              onChange={event => this.updateProperty(event)}
            />
          </label>
          <label>
            Current Company
            <input
              id="profile-company"
              type="text"
              name="company"
              placeholder="Rad Tech Co."
              value={this.state.mentor.company}
              onChange={event => this.updateProperty(event)}
            />
          </label>
          <label>
            Position Title
            <input
              id="profile-position"
              type="text"
              name="position"
              placeholder="Senior Developer"
              value={this.state.mentor.position}
              onChange={event => this.updateProperty(event)}
            />
          </label>
          <label>
            Type of Developer
            <input
              type="text"
              name="dev_type"
              placeholder="Type of Developer"
              value={this.state.mentor.dev_type}
              onChange={event => this.updateProperty(event)}
            />
          </label>
          <label>
            Stack
            <input
              type="text"
              name="stack"
              placeholder="Stack Knowledge"
              value={this.state.mentor.stack}
              onChange={event => this.updateProperty(event)}
            />
          </label>
          <label>
            Availability to Pair
            <div className='pairing-location'>
              <input
                id='profile-pair-turing'
                type='checkbox'
                name='pairing_location'
                value='turing'
                onChange={event => this.updateProperty(event)}
              />
              <label htmlFor='profile-pair-turing'>at Turing</label>

              <input
                id='profile-pair-offcampus'
                type='checkbox'
                name='pairing_location'
                value='off-campus'
                onChange={event => this.updateProperty(event)}
              />
              <label htmlFor='profile-pair-offcampus'>off campus</label>

              <input
                id='profile-pair-remote'
                type='checkbox'
                name='pairing_location'
                value='remote'
                onChange={event => this.updateProperty(event)}
              />
              <label htmlFor='profile-pair-remote'>remote</label>
            </div>
          </label>
          <input
            type="submit"
            value="Create Mentor"
          />
        </form>
      </div>
    )
  }
}
