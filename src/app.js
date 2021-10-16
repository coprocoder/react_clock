import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Home                  from './views/home'
import {Error404}            from './views/errors'

import './base.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route component={Error404} />
        </Switch>
      </div>
    );
  }
}

export default App;