import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Administrator, HealthcareWorker, Patient, LoggedIn } from './auth/roles';
import user from './auth/user';

import Dashboard from './components/dashboard';
import BusinessIntelligence from './components/business-intelligence';
import MultiPatient from './components/multi-patient';
import SinglePatient from './components/single-patient';

class Application extends Component {

  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" 
          render={() => authorise(LoggedIn, (<Dashboard />))} />
        <Route exact path="/business-intelligence" 
          render={() => authorise(Administrator, (<BusinessIntelligence />))} />
        <Route exact path="/multi-patient" 
          render={() => authorise(HealthcareWorker, (<MultiPatient />))} />
        <Route exact path="/single-patient"
          render={() => authorise(Patient, (<SinglePatient />))} />
      </BrowserRouter>
    );
  }
}

const authorise = (authorisation, view) => {
  if (user.isAuthorised(authorisation)) {
    return view;
  } else {
    return (<Redirect to="/" />)
  }
}

export default Application
