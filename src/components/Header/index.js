import React, { useCallback, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MdAccountCircle, MdCall, MdPlace, MdClose } from 'react-icons/md';

import { Container, Content, MiddleContent, HeaderInput } from './style';
import Notifications from './Notification';
import Language from './Language';

import logo from '../../assets/HJVA-logo.png';
import { signOut } from '../../store/modules/auth/actions';
import api from '../../services/api';

export default function Header() {
  const [hasNotification, setHasNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadAllCompressionTests = async () => {
      if (user) {
        const { data } = await api.get('compressionTests');
        if (data) {
          const hasWarnings = data.find((c) => c.hasWarning);
          setHasNotification(!!hasWarnings);
        }
      }

      setIsLoading(false);
    };
    loadAllCompressionTests();
    // const timer = setInterval(() => {
    //   loadAllCompressionTests();
    // }, 5000);
    return () => {
      // clearInterval(timer);
    };
  }, [user]);

  const handleSignOut = useCallback(() => {
    dispatch(signOut(history));
  }, [history, dispatch]);

  return (
    <Container>
      <Content hasNotification={hasNotification}>
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
            <Language />
            {user && (
              <Notifications
                isLoading={isLoading}
                hasNotification={hasNotification}
              />
            )}
            <Link to="/login">
              <div className="user-container">
                <MdAccountCircle />
                <span>{user ? user.name : 'Fazer login'}</span>
              </div>
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
