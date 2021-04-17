import React, { useEffect, useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  MdAccountCircle,
  MdLocalGroceryStore,
  MdGroup,
  MdLocalShipping,
} from 'react-icons/md';

import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { Container, Content, BarItem } from './style';
import api from '../../services/api';
import { signOut } from '../../store/modules/auth/actions';
import estoqueIconPath from '../../assets/estoque.svg';
import concreteTestIconPath from '../../assets/concrete.ico';

export default function SideBar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState('common');

  const handleSignOut = useCallback(() => {
    dispatch(signOut(history));
  }, [history, dispatch]);

  useEffect(() => {
    const loadUserRole = async () => {
      try {
        const res = await api.get('/user');
        if (!res.data) {
          throw Error('Usuário não encontrado');
        }
        setUserRole(res.data.role);
      } catch (error) {
        handleSignOut();
        toast.error(error.message);
      }
    };
    loadUserRole();
  }, [handleSignOut]);

  return (
    <Container>
      <Content>
        <BarItem>
          <Link to="/user">
            <MdAccountCircle />
            <span>Editar usuario</span>
          </Link>
        </BarItem>
        {userRole === 'admin' && (
          <BarItem>
            <Link to="/users">
              <MdGroup />
              <span>Editar acessos</span>
            </Link>
          </BarItem>
        )}
        {(userRole === 'admin' || userRole === 'office') && (
          <BarItem>
            <Link to="/product/edit">
              <MdLocalGroceryStore />
              <span>Editar Produtos</span>
            </Link>
          </BarItem>
        )}
        <BarItem>
          <Link to="/">
            <MdLocalShipping />
            <span>Estoque</span>
          </Link>
        </BarItem>
        <BarItem>
          <Link to="/">
            <img src={concreteTestIconPath} alt="probeta" />
            <span>Probetas</span>
          </Link>
        </BarItem>
      </Content>
    </Container>
  );
}
