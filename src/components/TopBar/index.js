import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function TopBar({ children, ...rest }) {
  return <Container {...rest}>{children}</Container>;
}

TopBar.propTypes = {};

export default TopBar;
