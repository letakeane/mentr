import React from 'react';
import { Link } from 'react-router-dom';

export const ChooseStatus = (props) => {

  return(
    <div>
      <h2>I AM A:</h2>
      <div className='choose-link-box'>
        <Link to='/create-student' className='button' className='choose-link'>STUDENT</Link>
        <Link to='/edit-mentor' className='choose-link'>MENTOR</Link>
      </div>
    </div>
  )
}
