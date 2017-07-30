import React from 'react';
import { Link } from 'react-router-dom';

export const StudentHome = (props) => {
  const { user } = props;
  return (
    <div>
      <img src={props.user.avatar_url} id='user-image' />
      <Link to='/create-student'>EDIT PROFILE</Link>
      <Link to='/find-mentors'>FIND MENTORS</Link>
    </div>
  )
}
