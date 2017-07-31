import React from 'react';
import { Route } from 'react-router';
import { FindMentors } from './FindMentors';

export const StudentHome = (props) => {

  return (
    <div>
      <h2>Student Home</h2>
      <FindMentors />
    </div>
  )
}
