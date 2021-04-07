import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  MdAccountCircle,
  MdCall,
  MdPlace,
  MdNotifications,
  MdClose,
} from 'react-icons/md';
import logo from '../../assets/HJVA-logo.png';

import { Container, Content, MiddleContent, HeaderInput } from './style';
import { signOut } from '../../store/modules/auth/actions';

export default function Header() {
  const history = useHistory();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = useCallback(() => {
    dispatch(signOut(history));
  }, [history, dispatch]);

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/">
            <img src={logo} alt="HJVA" />
            <span>Comércio y Construcciones HVA Ltda</span>
          </Link>
        </nav>
        <MiddleContent>
          <HeaderInput placeholder="Pesquisa" />
          <div>
            <Link to="/">
              <MdCall />
            </Link>
            <Link to="/location">
              <MdPlace />
            </Link>
          </div>
        </MiddleContent>
        <aside>
          <nav>
            {user && (
              <Link to="/">
                <MdNotifications />
              </Link>
            )}
            <Link to="/login">
              <MdAccountCircle />
              <span>{user ? user.name : 'Fazer login'}</span>
            </Link>
            {user && (
              <button type="button" name="logout" onClick={handleSignOut}>
                <MdClose />
              </button>
            )}
          </nav>
        </aside>
      </Content>
    </Container>
  );
}
