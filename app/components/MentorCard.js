import React, { Component } from 'react';

export default class MentorCard extends Component  {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      showMore: false
    };
    this.toggleView = this.toggleView.bind(this);
  }

  toggleView() {
    let view = !this.state.showMore;
    this.setState({
      showMore: view
    });
  }

  render() {
    const { preferred_name, bio, availability, company, dev_type, email, slack, location, phone, pairing_location, position, preferred_contact, stack, ghId } = this.props.mentor;
    let view = this.state.showMore ? 'Show Less' : 'Show More';
    if(!this.state.showMore) {
      return (
        <div>
          <h2>{preferred_name}</h2>
          <h3>Bio:
            <p>{bio}</p>
          </h3>
          <h3>Location:
            <p>{location}</p>
          </h3>
          <h3>Stack:
            <p>{stack}</p>
          </h3>
          <h3>Dev Type:
            <p>{dev_type}</p>
          </h3>
          <button onClick={this.toggleView}> {view} </button>
        </div>
      )
    } else {
      return (
        <div>
          <h2>{preferred_name}</h2>
          <h3>Bio:
            <p>{bio}</p>
          </h3>
          <h3>Location:
            <p>{location}</p>
          </h3>
          <h3>Stack:
            <p>{stack}</p>
          </h3>
          <h3>Dev Type:
            <p>{dev_type}</p>
          </h3>
          <h3>Position:
            <p>{position}</p>
          </h3>
          <h3>Company:
            <p>{company}</p>
          </h3>
          <h3>Availability:
            <p>{availability}</p>
          </h3>
          <h3>Pairing Location:
            <p>{pairing_location}</p>
          </h3>
          <h3>Contact:
            <p>Preferred Form of Contact: {preferred_contact}</p>
            <p>Slack: {slack}</p>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
          </h3>
          <button onClick={this.toggleView}> {view} </button>
        </div>
      )
    }
  }
}
