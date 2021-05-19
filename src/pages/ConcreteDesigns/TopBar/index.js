import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function TopBar({ onNewButton, ...rest }) {
  return (
    <Container {...rest}>
      <button type="button" onClick={onNewButton}>
        Crear
      </button>
    </Container>
  );
}

export default TopBar;

TopBar.propTypes = {
  onNewButton: PropTypes.func.isRequired,
};
