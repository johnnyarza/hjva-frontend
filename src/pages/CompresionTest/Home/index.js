import React from 'react';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import SideBar from '../../../components/SideBar';

import { Container, Content, MenuContainer } from './style';

function CompresionTestHome() {
  return (
    <>
      <SideBar />
      <Container>
        <MenuContainer>
          <Menu
            menuButton={<MenuButton>Arquivo</MenuButton>}
            arrow="arrow"
            direction="bottom"
            viewScroll="initial"
          >
            <MenuItem>Novo</MenuItem>
            <MenuItem>Save</MenuItem>
            <MenuItem>Close Window</MenuItem>
          </Menu>
          <Menu
            menuButton={<MenuButton>Registro</MenuButton>}
            arrow
            direction="bottom"
            viewScroll="initial"
          >
            <MenuItem onClick={() => console.log('clientes')}>
              Clientes
            </MenuItem>
            <MenuItem>Dosagens</MenuItem>
            <MenuItem>Materiais</MenuItem>
            <MenuItem>Fornecedores</MenuItem>
          </Menu>
        </MenuContainer>

        <Content>
          <h1>aaa</h1>
        </Content>
      </Container>
    </>
  );
}

export default CompresionTestHome;
