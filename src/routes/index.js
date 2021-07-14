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
import Stock from '../pages/Stock';
import Category from '../pages/Category';
import Measurements from '../pages/Measurements';
import ConcreteDesigns from '../pages/ConcreteDesigns';
import MaterialTransaction from '../pages/Stock/MaterialTransaction';
import ConcreteSample from '../pages/CompresionTest/ConcreteSample';

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
        isPrivate
        hasSideBar
        component={(props) => <Dashboard {...props} />}
      />

      <Route
        path="/user"
        exact
        isPrivate
        hasSideBar
        component={(props) => <User {...props} />}
      />

      <Route
        path="/users"
        exact
        isPrivate
        hasSideBar
        component={(props) => <UsersDashboard {...props} />}
      />

      <Route
        path="/location"
        exact
        component={(props) => <Location {...props} />}
      />

      <Route
        path="/product/edit"
        exact
        isPrivate
        hasSideBar
        component={(props) => <ProductDashboard {...props} />}
      />

      <Route
        path="/product/:id"
        component={(props) => <Product {...props} />}
      />

      <Route
        path="/compresionTest/home"
        exact
        isPrivate
        hasSideBar
        component={(props) => <CompresionTestHome {...props} />}
      />

      <Route
        path="/compresionTest/:id"
        isPrivate
        hasSideBar
        component={(props) => <ConcreteSample {...props} />}
        exact
      />
      <Route
        path="/clients"
        exact
        isPrivate
        hasSideBar
        component={(props) => <Clients {...props} />}
      />
      <Route
        path="/providers"
        exact
        hasSideBar
        isPrivate
        component={(props) => <Providers {...props} />}
      />
      <Route
        path="/category"
        exact
        hasSideBar
        isPrivate
        component={(props) => <Category {...props} />}
      />

      <Route
        path="/stock"
        exact
        hasSideBar
        isPrivate
        component={(props) => <Stock {...props} />}
      />

      <Route
        path="/measurements"
        exact
        hasSideBar
        isPrivate
        component={(props) => <Measurements {...props} />}
      />
      <Route
        path="/concreteDesigns"
        exact
        hasSideBar
        isPrivate
        component={(props) => <ConcreteDesigns {...props} />}
      />
      <Route
        path="/materialTransactions"
        exact
        component={(props) => <MaterialTransaction {...props} />}
        hasSideBar
        isPrivate
      />
    </Switch>
  );
}
