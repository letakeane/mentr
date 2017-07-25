import React from 'react';

export const CreateProfile = () => {
  return (
    <article className='create-profile'>
      <h2>Create your profile</h2>
      <form id='create-profile-form'>
        <label>name</label>
        <input id='profile-name' type='text' placeholder='Your preferred name'></input>

        <label>select one</label>
        <select id='profile-type'>
          <option value='Front-End'>Front-End</option>
          <option value='Back-End'>Back-End</option>
          <option value='Full-Stack'>Full-Stack</option>
        </select>

        <label>location</label>
        <input id='profile-location' type='text' placeholder='City, STATE'></input>

        <label>position title</label>
        <input id='profile-position' type='text' placeholder='Senior developer'></input>

        <label>company</label>
        <input id='profile-company' type='text' placeholder='Rad Tech Co' />

        <label>Slack</label>
        @<input id='profile-slack' type='text' placeholder='username' />

        <label>Email</label>
        <input id='profile-email' type='email' placeholder='email@youremail.com' />

        <label>Phone</label>
        <input type='tel' pattern='^[0-9\-\+\s\(\)]*$' placeholder='555-123-4567' />

        <label>preferred method of contact</label>
        <div className='preferred-contact-radios'>
          <input type='radio' id='profile-prefer-slack' name='preferred-contact' value='slack' />
          <label htmlFor='profile-prefer-slack'>Slack</label>

          <input type='radio' id='profile-prefer-email' name='preferred-contact' value='email' />
          <label htmlFor='profile-prefer-email'>Email</label>

          <input type='radio' id='profile-prefer-phone' name='preferred-contact' value='phone' />
          <label htmlFor='profile-prefer-phone'>Phone</label>
        </div>

        <label>stack</label>
        <textarea id='profile-stack' form='create-profile-form' placeholder='List the languages, libraries, and frameworks you regularly use.' />

        <label>bio</label>
        <textarea id='profile-bio' form='create-profile-form' placeholder='Introduce yourself! Include your nontechnical skills and hobbies' />


        <label>Are you currently accepting new mentees?</label>
        <div className='new-mentees-radios'>
          <input type='radio' id='profile-new-yes' name='accepting-new' value='y' />
          <label htmlFor='profile-new-yes'>Yes</label>

          <input type='radio' id='profile-new-no' name='accepting-new' value='n' />
          <label htmlFor='profile-new-no'>No</label>
        </div>

        <label>Available to pair</label>
        <div className='pairing-location'>
          <input type='checkbox' id='profile-pair-turing' name='pairing-location' value='turing' />
          <label htmlFor='profile-pair-turing'>at Turing</label>

          <input type='checkbox' id='profile-pair-offcampus' name='pairing-location' value='off-campus' />
          <label htmlFor='profile-pair-offcampus'>off campus</label>

          <input type='checkbox' id='profile-pair-remote' name='pairing-location' value='remote' />
          <label htmlFor='profile-pair-remote'>remote</label>
        </div>

        <label>describe your availability</label>
        <textarea id='profile-availability' form='create-profile-form' placeholder='Weekdays after 6pm' />

      </form>
      <button id='submit'>SAVE PROFILE</button>
    </article>
  )
}
