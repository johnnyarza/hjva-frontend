import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';
import TopBar from '../../../components/DinTopBar';

function ProvidersTopBar({ onNewButton, ...rest }) {
  return (
    <TopBar {...rest}>
      <button type="button" onClick={onNewButton}>
        Crear
      </button>
    </TopBar>
  );
}

export default ProvidersTopBar;

ProvidersTopBar.propTypes = {
  onNewButton: PropTypes.func.isRequired,
};
