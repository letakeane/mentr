import React from 'react';
import { Route } from 'react-router';
import { FindMentors } from './FindMentors';
import MentorCard from './MentorCard';
import { Link } from 'react-router-dom';


export const StudentHome = (props) => {
  const { user } = props;

  const generateMentors = () => {
    if (!props.matchingMentors.length) {
      return props.mentors.map( mentor => {
        return (
          <MentorCard mentor={mentor} key={mentor.id} />
        )
      });
    } else {
      return props.matchingMentors.map( mentor => {
        return(
          <MentorCard mentor={mentor} key={mentor.id} />
        )
      });
    }
  };

  return (
    <div>
      <h2>Student Home</h2>
      <img src={props.user.avatar_url} id='user-image' />
      <Link
        to='/create-student'
        className='student-edit-link'>
        EDIT PROFILE
      </Link>
      <FindMentors
        matchingMentors={props.matchingMentors}
        getFilteredMentors={props.getFilteredMentors}
        mentors={props.mentors} />
        <div>
          {generateMentors()}
        </div>

    </div>
  )
}
