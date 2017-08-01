import React, { Component } from 'react';
import { Route } from 'react-router';

export class FindMentors extends Component {
  constructor(props) {
    super(props)
    this.allMentors = props.mentors;
    this.state = {
      searchParams: {
        location: '',
        preferred_contact: '',
        preferred_name: '',
        availability: '',
        company: '',
        devType: '',
        stack: '',
        pairing_location: '',
      }
    }
    this.setSelectedKeys = this.setSelectedKeys.bind(this);
    this.filterMentors = this.filterMentors.bind(this);
  }

  setSelectedKeys(searchParams) {
    return Object.keys(searchParams).filter( param => {
      return searchParams[param];
    });
  }

  filterMentors(selectedKeys, searchParams) {
    const targetMentors = [];

    this.allMentors.forEach( mentor => {
      let pushing = true;

      selectedKeys.forEach( key => {
        if (!mentor[key].toLowerCase().includes(searchParams[key].toLowerCase())) {
          pushing = false;
        }
        if (pushing) {
          targetMentors.push(mentor);
        }
      });
    });
    return targetMentors;
  }

  updateProperty(e) {
    const { name, value } = e.target;

    this.setState({
      searchParams: Object.assign(this.state.searchParams, {
        [name]: value
      })
    });
  }

  render() {
    const { getFilteredMentors } = this.props;
    let { searchParams } = this.state;

    return (
      <div>
        <h2>Search for a Mentor</h2>
        <form
          onSubmit={e => getFilteredMentors(e, searchParams, this.setSelectedKeys, this.filterMentors )}>
          <label> Name
            <input
              type='text'
              name='preferred_name'
              placeholder='Jane Doe'
              value={this.state.searchParams.preferred_name}
              onChange={e => this.updateProperty(e)}
            />
          </label>
          <label> Location
            <input
              type='text'
              name='location'
              placeholder='Denver, CO'
              value={this.state.searchParams.location}
              onChange={e => this.updateProperty(e)}
            />
          </label>
          <label> Preferred Form of Contact
            <input
              type='text'
              name='preferred_contact'
              placeholder='Slack'
              value={this.state.searchParams.preferred_contact}
              onChange={e => this.updateProperty(e)}
            />
          </label>
          <label> Company
            <input
              type='text'
              name='company'
              placeholder='SendGrid'
              value={this.state.searchParams.company}
              onChange={e => this.updateProperty(e)}
            />
          </label>
          <label> Dev Type
            <input
              type='text'
              name='dev_type'
              placeholder='Frontend, backend, or full stack'
              value={this.state.searchParams.dev_type}
              onChange={e => this.updateProperty(e)}
            />
          </label>
          <label> Stack
            <input
              type='text'
              name='stack'
              placeholder='Ruby'
              value={this.state.searchParams.stack}
              onChange={e => this.updateProperty(e)}
            />
          </label>
          <label> Pairing Location
            <input
              type='text'
              name='pairing_location'
              placeholder='Turing'
              value={this.state.searchParams.pairing_location}
              onChange={e => this.updateProperty(e)}
            />
          </label>
          <input
            className='buttons'
            type="submit"
            value="Filter Mentors"
          />
        </form>

      </div>
    )
  }
}
