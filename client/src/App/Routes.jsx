import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import history from 'browserHistory';
import Project from 'Project';
import Authenticate from 'Auth/Authenticate';
import LoginForm from 'Auth/LoginForm';
import DashBoard from 'Dashboard';
//import Customers from 'Customers';
import Sample from 'Sample';
import PageError from 'shared/components/PageError';

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <Route path="/authenticate" component={LoginForm} />
      <Route path="/project" component={Project} />
      <Route path="/dashboard" component={DashBoard} />
      <Route path="/sample" component={Sample} />
      <Route component={PageError} />
    </Switch>
  </Router>
);

export default Routes;
