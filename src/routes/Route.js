import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
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
      <ErrorBoundary
        fallbackRender={({ error }) => (
          <div>
            <h1>An error occurred: {error.message}</h1>
          </div>
        )}
      >
        <Route {...rest} component={Component} />
      </ErrorBoundary>
    </DefaultLayout>
  );
}
RouteWrapper.propTypes = {
  privilege: PropTypes.arrayOf(PropTypes.string).isRequired,
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
