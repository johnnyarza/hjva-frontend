import React, { useEffect, useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  MdAccountCircle,
  MdLocalGroceryStore,
  MdGroup,
  MdLocalShipping,
  MdPerson,
} from 'react-icons/md';
import {
  FaDolly,
  FaTags,
  FaBalanceScale,
  FaWeightHanging,
} from 'react-icons/fa';

import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { Container, Content, BarItem } from './style';
import api from '../../services/api';
import { signOut } from '../../store/modules/auth/actions';
import concreteTestIconPath from '../../assets/concrete.ico';
import utils from '../../utils';

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

        {utils.pagesAccess.users.find((r) => r === userRole) && (
          <BarItem>
            <Link to="/users">
              <MdGroup />
              <span>Editar acessos</span>
            </Link>
          </BarItem>
        )}
        {utils.pagesAccess.stockToSell.find((r) => r === userRole) && (
          <BarItem>
            <Link to="/stock/toSell">
              <MdLocalGroceryStore />
              <span>Editar Produtos</span>
            </Link>
          </BarItem>
        )}
        {utils.pagesAccess.category.find((r) => r === userRole) && (
          <BarItem>
            <Link to="/category">
              <FaTags />
              <span>Categorias</span>
            </Link>
          </BarItem>
        )}

        {utils.pagesAccess.measurements.find((r) => r === userRole) && (
          <BarItem>
            <Link to="/measurements">
              <FaWeightHanging />
              <span>Unidades Medi.</span>
            </Link>
          </BarItem>
        )}
        {utils.pagesAccess.providers.find((r) => r === userRole) && (
          <BarItem>
            <Link to="/providers">
              <MdLocalShipping />
              <span>Proveedores</span>
            </Link>
          </BarItem>
        )}
        {utils.pagesAccess.clients.find((r) => r === userRole) && (
          <BarItem>
            <Link to="/clients">
              <MdPerson />
              <span>Clientes</span>
            </Link>
          </BarItem>
        )}
        {utils.pagesAccess.stock.find((r) => r === userRole) && (
          <BarItem>
            <Link to="/stock">
              <FaDolly />
              <span>Estoque</span>
            </Link>
          </BarItem>
        )}
        {utils.pagesAccess.concreteDesigns.find((r) => r === userRole) && (
          <BarItem>
            <Link to="/concreteDesigns">
              <FaBalanceScale />
              <span>Dosificaciones</span>
            </Link>
          </BarItem>
        )}
        {utils.pagesAccess.compressionTestHome.find((r) => r === userRole) && (
          <BarItem>
            <Link to="/compresionTest/home">
              <img src={concreteTestIconPath} alt="probeta" />
              <span>Probetas</span>
            </Link>
          </BarItem>
        )}
      </Content>
    </Container>
  );
}
