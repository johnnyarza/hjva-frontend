import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Home from '../pages/Home/index';
import Dashboard from '../pages/Dashboard';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Product from '../pages/Product';
import Location from '../pages/Location';
import User from '../pages/User';
import ProductDashboard from '../pages/ProductDashboard';
import UsersDashboard from '../pages/UsersDashboard';
import CompresionTestHome from '../pages/CompresionTest/Home';
import Clients from '../pages/Clients';
import Providers from '../pages/Providers';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} key="home" />

      <Route
        path="/register"
        exact
        component={(props) => <SignUp {...props} />}
      />
      <Route path="/login" exact component={(props) => <SignIn {...props} />} />

      <Route
        path="/dashboard"
        exact
        component={(props) => <Dashboard {...props} />}
        isPrivate
      />

      <Route
        path="/user"
        exact
        component={(props) => <User {...props} />}
        isPrivate
      />

      <Route
        path="/users"
        exact
        component={(props) => <UsersDashboard {...props} />}
        isPrivate
      />

      <Route
        path="/location"
        exact
        component={(props) => <Location {...props} />}
      />

      <Route
        path="/product/edit"
        exact
        component={(props) => <ProductDashboard {...props} />}
        isPrivate
      />

      <Route
        path="/product/:id"
        component={(props) => <Product {...props} />}
      />

      <Route
        path="/compresionTest/home"
        exact
        component={(props) => <CompresionTestHome {...props} />}
      />
      <Route
        path="/clients"
        exact
        component={(props) => <Clients {...props} />}
      />
      <Route
        path="/providers"
        exact
        component={(props) => <Providers {...props} />}
      />
    </Switch>
  );
}
