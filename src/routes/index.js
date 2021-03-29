import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Home from '../pages/Home/index';

import Dashboard from '../pages/Dashboard';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />

      <Route
        path="/register"
        exact
        component={(props) => <SignUp {...props} />}
      />
      <Route path="/login" exact component={(props) => <SignIn {...props} />} />

      <Route path="/dashboard" exact component={Dashboard} isPrivate />
    </Switch>
  );
}
