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
        dev_type: 'Front-End',
        stack: '',
        pairing_location: '',
        gh_id: this.props.user.ghId,
        avatar_url: this.props.user.avatar_url
      },
      errorStatus: '',
      PATCH: false,
      turing: false,
      remote: false,
      'off-campus': false,
      slack: false,
      email: false,
      phone: false
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

  updateCheckboxes (event) {
    const { name, value } = event.target;

    if (this.state.mentor.pairing_location.includes(`${value}`)) {
      return
    } else {
      this.setState({
        mentor: Object.assign(this.state.mentor, {
          pairing_location: this.state.mentor[name] + ' ' + value
        })
      })
    }
  }

  addMentor(event) {
    event.preventDefault();
    const { mentor } = this.state;

    if (this.state.PATCH) {
      fetch(`/api/v1/mentors/${mentor.gh_id}`, {
        method: 'PATCH',
        body: JSON.stringify(mentor),
        headers: {
          'CONTENT-TYPE': 'application/json'
        }
      })
        .then(() => {
          fetch(`/api/v1/mentors/${mentor.gh_id}`)
            .then(response => response.json())
            .then(currentMentor => {
              this.props.setCurrentMentor(currentMentor[0]);
            })
            .catch(error => console.log(error))
        })
        .catch(error => {
          this.setState({
            errorStatus: 'Error editing profile; please make sure the form is accurately filled out'
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
            errorStatus: 'Error creating profile; please make sure the form is accurately filled out'
          })
        })
    }
  }

  toggleClass(event) {
    const { value } = event.target;

    this.setState({
      [value]: !this.state[value]
    })
    console.log(this.state);
  }

  checkDatabase() {
    const { ghId } = this.props.user;

    fetch(`/api/v1/mentors/${ghId}`)
      .then(response => response.json())
      .then(mentor => {
        if (mentor.length === 1) {
          this.setState({
            mentor: Object.assign(this.state.mentor, mentor[0]),
            PATCH: true
          })
          this.checkPreferredContact()
          this.checkCheckboxes();
        } else {
          this.setState({ PATCH: false })
          return
        }
      })
  }

  checkPreferredContact() {
    if (this.state.mentor.preferred_contact.includes('slack')) {
      this.setState({
        slack: true
      })
    } else if (this.state.mentor.preferred_contact.includes('email')) {
      this.setState({
        email: true
      })
    } else if (this.state.mentor.preferred_contact.includes('phone')) {
      this.setState({
        phone: true
      })
    }
  }

  checkCheckboxes() {
    if (this.state.mentor.pairing_location.includes('turing')) {
      this.setState({
        turing: true
      })
    }

    if (this.state.mentor.pairing_location.includes('remote')) {
      this.setState({
        remote: true
      })
    }

    if (this.state.mentor.pairing_location.includes('off-campus')) {
      this.setState({
        'off-campus': true
      })
    }
  }

  errorMessage() {
    if (this.state.errorStatus.length) {
      return (
        <p id='form-error'>{this.state.errorStatus}</p>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

  componentWillMount() {
    this.checkDatabase()
  }

  render() {
    return (
      <div>
        <h2>Create Mentor Profile</h2>
        {this.errorMessage()}
        <form
          id="create-profile-form"
          onSubmit={event => {
            this.addMentor(event);
          }}
        >
          <label>
            Preferred Name*
            <input
              type="text"
              name="preferred_name"
              placeholder="Preferred Name"
              value={this.state.mentor.preferred_name}
              onChange={event => this.updateProperty(event)}
              required
            />
          </label>
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
              placeholder="Interests, soft skills, hobbies, etc"
              value={this.state.mentor.bio}
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
            Preferred Method of Contact*
            <div className='preferred-contact-radios'>
              <input
                type='radio'
                id='profile-prefer-slack'
                name='preferred_contact'
                value='slack'
                checked={this.state.slack}
                onClick={(event) => this.toggleClass(event)}
                onChange={event => this.updateProperty(event)}
                required
              />
              <label htmlFor='profile-prefer-slack'>Slack</label>

              <input
                id='profile-prefer-email'
                type='radio'
                name='preferred_contact'
                value='email'
                checked={this.state.email}
                onClick={(event) => this.toggleClass(event)}
                onChange={event => this.updateProperty(event)}
              />
              <label htmlFor='profile-prefer-email'>Email</label>

              <input
                id='profile-prefer-phone'
                type='radio'
                name='preferred_contact'
                value='phone'
                checked={this.state.phone}
                onClick={(event) => this.toggleClass(event)}
                onChange={event => this.updateProperty(event)}
              />
              <label htmlFor='profile-prefer-phone'>Phone</label>
            </div>
          </label>
          <label>
            Are you currently accepting new mentees?*
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
              placeholder="Weekdays after 5pm"
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
            Type of Developer*
            <select
              name="dev_type"
              value={this.state.mentor.dev_type}
              onChange={event => this.updateProperty(event)}
              required
            >
              <option value="Front-End">Front-End</option>
              <option value="Back-End">Back-End</option>
              <option value="Full Stack">Full Stack</option>
            </select>
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
                checked={this.state.turing}
                onClick={(event) => this.toggleClass(event)}
                onChange={event => this.updateCheckboxes(event)}
              />
              <label htmlFor='profile-pair-turing'>at Turing</label>

              <input
                id='profile-pair-offcampus'
                type='checkbox'
                name='pairing_location'
                value='off-campus'
                checked={this.state['off-campus']}
                onClick={(event) => this.toggleClass(event)}
                onChange={event => this.updateCheckboxes(event)}
              />
              <label htmlFor='profile-pair-offcampus'>off campus</label>

              <input
                id='profile-pair-remote'
                type='checkbox'
                name='pairing_location'
                value='remote'
                checked={this.state.remote}
                onClick={(event) => this.toggleClass(event)}
                onChange={event => this.updateCheckboxes(event)}
              />
              <label htmlFor='profile-pair-remote'>remote</label>
            </div>
          </label>
          <input
            type="submit"
            value="SUBMIT"
          />
        </form>
      </div>
    )
  }
}
