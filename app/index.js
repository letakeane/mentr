import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './components/App';
require('./styles/index.css');
var exportedStyles = require('!!css-loader!./styles/index.css');

render (
    <App/>, document.getElementById('main')
)
