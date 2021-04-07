import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdAccountCircle, MdLocalGroceryStore } from 'react-icons/md';

import { Container, Content, BarItem } from './style';
import api from '../../services/api';

export default function SideBar() {
  const [userRole, setUserRole] = useState('common');

  useEffect(() => {
    const loadUserRole = async () => {
      const res = await api.get('/user');
      setUserRole(res.data.role);
    };
    loadUserRole();
  }, []);

  return (
    <Container>
      <Content>
        <BarItem>
          <Link to="/user">
            <MdAccountCircle />
            <span>Editar usuario</span>
          </Link>
        </BarItem>
        {(userRole === 'admin' || userRole === 'office') && (
          <BarItem>
            <Link to="/product/edit">
              <MdLocalGroceryStore />
              <span>Editar Produtos</span>
            </Link>
          </BarItem>
        )}
      </Content>
    </Container>
  );
}
