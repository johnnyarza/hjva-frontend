import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux';
import DefaultLayout from '../pages/_layouts/Default';

function RouteWrapper({
  component: Component,
  isPrivate,
  hasSideBar,
  privilege,
  ...rest
}) {
  const { signed } = useSelector((state) => state.auth);

  if (!signed && isPrivate) {
    return <Redirect to="/login" />;
  }

  return (
    <DefaultLayout hasSideBar={hasSideBar} privilege={privilege}>
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
