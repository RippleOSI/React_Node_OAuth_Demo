import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Dashboard from './components/dashboard';
import BusinessIntelligence from './components/business-intelligence';
import MultiPatient from './components/multi-patient';
import SinglePatient from './components/single-patient';

class Application extends Component {

  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" render={() => (<Dashboard />)} />
        <Route exact path="/business-intelligence" render={() => (<BusinessIntelligence />)} />
        <Route exact path="/multi-patient" render={() => (<MultiPatient />)} />
        <Route exact path="/single-patient" render={() => (<SinglePatient />)} />
      </BrowserRouter>
    );
  }
}

export default Application
