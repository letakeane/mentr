import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './components/App';
import Callback from './components/Callback';

import createHistory from 'history/createBrowserHistory';
import { Route, Link, Switch, BrowserRouter } from 'react-router-dom';

let history = createHistory();

// render (
//     <App/>, document.getElementById('main')
// )

render(<BrowserRouter history={history} >
        <div>
            <Route to='/' component={App}/>
        </div>
     </BrowserRouter>, document.getElementById('main'))