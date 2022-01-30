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
import ContactMe from '../pages/ContactMe';

import utils from '../utils';

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
        privilege={utils.pagesAccess.users}
        component={(props) => <UsersDashboard {...props} />}
      />

      <Route
        path="/location"
        exact
        component={(props) => <Location {...props} />}
      />

      <Route
        path="/contactMe"
        exact
        component={(props) => <ContactMe {...props} />}
      />

      <Route
        path="/stock/toSell"
        exact
        isPrivate
        hasSideBar
        privilege={utils.pagesAccess.stockToSell}
        component={(props) => <Stock {...props} />}
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
        privilege={utils.pagesAccess.compressionTestHome}
        component={(props) => <CompresionTestHome {...props} />}
      />

      <Route
        path="/compresionTest/:id"
        isPrivate
        hasSideBar
        privilege={utils.pagesAccess.compressionTestId}
        component={(props) => <ConcreteSample {...props} />}
        exact
      />
      <Route
        path="/clients"
        exact
        isPrivate
        hasSideBar
        privilege={utils.pagesAccess.clients}
        component={(props) => <Clients {...props} />}
      />
      <Route
        path="/providers"
        exact
        hasSideBar
        isPrivate
        privilege={utils.pagesAccess.providers}
        component={(props) => <Providers {...props} />}
      />
      <Route
        path="/category"
        exact
        hasSideBar
        isPrivate
        privilege={utils.pagesAccess.category}
        component={(props) => <Category {...props} />}
      />

      <Route
        path="/stock"
        exact
        hasSideBar
        isPrivate
        privilege={utils.pagesAccess.stock}
        component={(props) => <Stock {...props} />}
      />

      <Route
        path="/measurements"
        exact
        hasSideBar
        isPrivate
        privilege={utils.pagesAccess.measurements}
        component={(props) => <Measurements {...props} />}
      />
      <Route
        path="/concreteDesigns"
        exact
        hasSideBar
        isPrivate
        privilege={utils.pagesAccess.concreteDesigns}
        component={(props) => <ConcreteDesigns {...props} />}
      />
      <Route
        path="/materialTransactions"
        privilege={utils.pagesAccess.materialTransactions}
        exact
        component={(props) => <MaterialTransaction {...props} />}
        hasSideBar
        isPrivate
      />
    </Switch>
  );
}
