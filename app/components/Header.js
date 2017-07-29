import React from 'react';

export const Header = () => {

  const logInOut = () => {
    return (
      <div>
        <div>
          <a id="log-in" href="http://github.com/login/oauth/authorize?client_id=5a67289f9670bc02530b&redirect_uri=http://localhost:1701/callback">
          LOG IN
          </a>
        </div>
        
      </div>
    )
  }

  return (
    <div className='app-header'>
      <h1>mentr</h1>
      {logInOut()}
    </div>
  )
}
