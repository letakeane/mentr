import React, { Component } from 'react';
export const Callback = props => {
  let login = (code) => {
    if(!code || props.user) {
      return
    }
    fetch(`/gh_auth_code/${code}`, {
      method: 'POST'
    })
    .then(resp => {
      return resp.json()
    })
    .then(data => {
      let wholeString = data.split("=")[1];
      fetchUser(wholeString.split('&')[0]);
    })
  };

  const postLoginRedirect = (ghId) => {
  //select from students where ghid = response id
    fetch(`/api/v1/students/${ghId}`)
    .then(response => response.json())
    .then(data => {
      if (data[0]) {
        //redirect to profile page
        props.history.replace('/student-profile');
        //set state using data
      } else {
        fetch(`/api/v1/mentors/${ghId}`)
        .then(resp => resp.json())
        .then(mentorData => {
          if (mentorData[0]) {

            props.history.replace('/mentor-profile')
            //set state with data

          } else {
            //redirect to create profile/type select page
            props.history.replace('/choose-status')
          }
        })
      }
    })
  }

  let fetchUser = (token) => {
    
    fetch(`/gh_auth_token/${token}`, {
      method: 'GET'
    })
    .then(resp => {
      return resp.json()
    })
    .then(data => {
      const userData = JSON.parse(data);
      console.log(data, 'token data maybe')
      const { avatar_url, name, location, company, bio }  = userData;
      const user = {
        avatar_url,
        ghId: userData.id,
        name,
        location,
        company,
        bio
      }
      props.setUser(user)
      postLoginRedirect(user.ghId)
     })
  };

  login(props.code)
  return(
    <div> the callback is here </div>
  )
}


  