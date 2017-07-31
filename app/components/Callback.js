import React, { Component } from 'react';

export const Callback = props => {
  const login = (code) => {
    if(!code || props.user) {
      return
    }
    fetch(`/gh_auth_code/${code}`, { method: 'POST' })
    .then(resp => {
      return resp.json()
    })
    .then(data => {
      let wholeString = data.split("=")[1];
      fetchUser(wholeString.split('&')[0]);
    })
  };

  const postLoginRedirect = (ghId) => {
    fetch(`/api/v1/students/${ghId}`)
    .then(response => response.json())
    .then(data => {
      if (data[0]) {
        props.history.replace('/student-profile');
        //set state using data
      } else {
        fetch(`/api/v1/mentors/${ghId}`)
        .then(resp => resp.json())
        .then(mentorData => {
          if (mentorData[0]) {

            props.history.replace('/mentor-profile');
            //set state with data

          } else {
            props.history.replace('/choose-status');
          }
        })
      }
    })
  }

  const fetchUser = (token) => {
    
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
  };

  login(props.code);
  return(
    <div> the callback is here </div>
  )
}
