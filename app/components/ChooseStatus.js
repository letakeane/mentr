import React from 'react';
import { Link } from 'react-router-dom';

export const ChooseStatus = (props) => {

  return(
    <div>
      <h2>I AM A:</h2>
      <Link to='/create-student' className='button'>STUDENT</Link>
      <Link to='/edit-mentor' className='button'>MENTOR</Link>
    </div>
  )
}
