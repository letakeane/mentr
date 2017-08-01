import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './components/App';
import Callback from './components/Callback';

import createHistory from 'history/createBrowserHistory';
import { Route, Link, Switch, BrowserRouter } from 'react-router-dom';
require('./styles/index.css');
var exportedStyles = require('!!css-loader!./styles/index.css');

let history = createHistory();

render(<BrowserRouter history={history} >
        <div>
            <Route to='/' render={() => <App className='app-' />}/>
        </div>
     </BrowserRouter>, document.getElementById('main'))
