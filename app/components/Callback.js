import React, { Component } from 'react';

export const Callback = props => {

  let login = (code) => {
    if(!code) {
      console.log('no code')
      return
    }
    fetch(`/gh_auth_code/${code}`, {
      method: 'POST'
    })
    .then(resp => {
      console.log(resp, 'im a big fat douche')
      return resp.json()
    })
    .then(data => {
      let wholeString = data.split("=")[1];
      console.log(wholeString.split('&')[0], ' data maybe')
      fetchUser(wholeString.split('&')[0])
    })
  };

  let fetchUser = (token) => {
    
    fetch(`/gh_auth_token/${token}`, {
      method: 'GET'
    })
    .then(resp => {
      return resp.json()
    })
    .then(data => {
      console.log(data, 'token data maybe')
      // let wholeString = data.split("=")[1];
      // console.log(wholeString.split('&')[0], ' data maybe')
     })
  };

  login(props.code)
  return(
    <div> the damn callback is here </div>
  )
}
