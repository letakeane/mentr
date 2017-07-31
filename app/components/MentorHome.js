import React, { Component } from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import MentorCard from './MentorCard';

export const MentorHome = ({ currentMentor }) => {

  return (
    <div>
      <MentorCard mentor={currentMentor} />
      <Link to='/edit-mentor'>EDIT PROFILE</Link>
    </div>
  )
}
