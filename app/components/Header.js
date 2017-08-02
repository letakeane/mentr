import React from 'react';

export const Header = ({ user, clearState }) => {

  const logInOut = () => {
    if (!user) {
      return (
        <a id="log-in" href="http://github.com/login/oauth/authorize?client_id=5a67289f9670bc02530b&redirect_uri=https://turing-mentr.herokuapp.com/callback">
        LOG IN
        </a>
      )
    } else {
      return (
        <a id="log-out" href='/' onClick={(e) => {
          e.preventDefault();
          clearState();
        }}>
        LOG OUT
        </a>
      )
    }
  }

  return (
    <div className='app-header'>
      <h1>mentr</h1>
      {logInOut()}
    </div>
  )
}
