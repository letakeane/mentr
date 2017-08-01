import React, { Component } from 'react';

export const Callback = props => {
  const login = (code) => {
    if(!code || props.user) {
      return
    }
    console.log(code, 'code 1st')
    fetch(`/gh_auth_code/${code}`, { method: 'POST' })
    .then(resp => {
      return resp.json()
    })
    .then(data => {
console.log('response from /gh_auth_code/CODE: ', data);
      let wholeString = data.split("=")[1];
      if(!wholeString.includes('error')) {
      fetchUser(wholeString.split('&')[0]);
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
  };

  const postLoginRedirect = (ghId) => {
    console.log(ghId, 'ghid 3rd')
    fetch(`/api/v1/students/${ghId}`)
    .then(response => response.json())
    .then(data => {
console.log('response from student fetch: ', data);
      if (data[0]) {
console.log('trying to redirect to student profile!');
        props.history.replace('/student-profile');
      } else {
        fetch(`/api/v1/mentors/${ghId}`)
        .then(resp => resp.json())
        .then(mentorData => {
          if (mentorData[0]) {
            props.history.replace('/mentor-profile');
          } else {
            props.history.replace('/choose-status');
          }
        })
        .catch(error => {
          response.status(500).json({ error });
        });
      }
    });
  };

  const fetchUser = (token) => {
    console.log(token, 'fetchuser token 2nd')

    fetch(`/gh_auth_token/${token}`, {
      method: 'GET'
    })
    .then(resp => {
      return resp.json()
    })
    .then(data => {
      const userData = JSON.parse(data);
      const { avatar_url, name, location, company, bio }  = userData;
      const user = {
        avatar_url,
        ghId: userData.id,
        name,
        location,
        company,
        bio
      }
      props.setUser(user);
      postLoginRedirect(user.ghId);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
  };

  login(props.code);

  return(
    <div></div>
  )
}
