import React from 'react';
import { Link } from 'react-router-dom';
import { MdAccountCircle, MdLocalGroceryStore } from 'react-icons/md';

import { Container, Content, BarItem } from './style';

export default function SideBar() {
  return (
    <Container>
      <Content>
        <BarItem>
          <Link to="/">
            <MdAccountCircle />
            <span>aaaaa</span>
          </Link>
        </BarItem>
        <BarItem>
          <Link to="/">
            <MdLocalGroceryStore />
            <span>a</span>
          </Link>
        </BarItem>
      </Content>
    </Container>
  );
}
