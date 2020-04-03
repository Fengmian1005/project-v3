import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './components/Home'

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    )
  }
}
