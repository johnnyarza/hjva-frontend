import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import DefaultLayout from '../pages/_layouts/Default';

import { store } from '../store';

function RouteWrapper({
  component: Component,
  isPrivate,
  hasSideBar,
  ...rest
}) {
  const { signed } = store.getState().auth;

  if (!signed && isPrivate) {
    return <Redirect to="/login" />;
  }

  return (
    <DefaultLayout hasSideBar={hasSideBar}>
      <Route {...rest} component={Component} />
    </DefaultLayout>
  );
}
RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  hasSideBar: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
  hasSideBar: false,
};
export default RouteWrapper;
