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
      }
      errorStatus: ''
    }
  }

  updateProperty(event) {
    const { name, value } = event.target;
    this.setState({
      mentor: Object.assign(this.state.mentor, {
        [name]: value
      })
    })
  }
  
}
