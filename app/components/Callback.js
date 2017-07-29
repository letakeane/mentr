import React, { Component } from 'react';

export const Callback = props => {
  let login = (code) => {
    console.log(code , '****code')
    if(!code) {
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
      console.log(wholeString, 'wholestring')
      fetchUser(wholeString.split('&')[0])
    })
  };

  let fetchUser = (token) => {
    console.log(token, ' token')
    
    fetch(`/gh_auth_token/${token}`, {
      method: 'GET'
    })
    .then(resp => {
      return resp.json()
    })
    .then(data => {
      console.log(data, 'token data maybe')
     })
  };

  login(props.code)
  return(
    <div> the callback is here </div>
  )
}
