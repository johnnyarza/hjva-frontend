import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';

import { Container } from './styles';

function TopBar({ onNewButton, ...rest }) {
  return (
    <Container {...rest}>
      <MenuButton onClick={onNewButton}>Crear</MenuButton>
      <Menu
        menuButton={<MenuButton>Registro</MenuButton>}
        arrow
        direction="bottom"
        viewScroll="initial"
      >
        <MenuItem>
          <Link to="/clients" style={{ color: 'black' }}>
            Clientes
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/providers" style={{ color: 'black' }}>
            Proveedores
          </Link>
        </MenuItem>
      </Menu>
      <MenuButton>
        <Link to="/materialTransactions" style={{ color: 'black' }}>
          Entradas/Salidas
        </Link>
      </MenuButton>
    </Container>
  );
}

export default TopBar;

TopBar.propTypes = {
  onNewButton: PropTypes.func.isRequired,
};
