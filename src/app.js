import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Switch, Route } from 'react-router-dom'

import {getProfileFetch} from './redux/actions.jsx';
import Home                  from './views/home'
import {Error404}            from './views/errors'

import './base.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/' component={Home} />
          <Route component={Error404} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch())
})

export default connect(null, mapDispatchToProps)(App);