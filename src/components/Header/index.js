import React, { useCallback, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MdAccountCircle, MdCall, MdPlace, MdClose } from 'react-icons/md';
import ReactWhatsapp from 'react-whatsapp';

import { IoLogoWhatsapp } from 'react-icons/io';
import { Container, Content, MiddleContent, HeaderInput } from './style';
import Notifications from './Notification';
import Language from './Language';

import logo from '../../assets/HJVA-logo.png';
import { signOut } from '../../store/modules/auth/actions';
import api from '../../services/api';

export default function Header() {
  const [hasNotification, setHasNotification] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(width <= 768);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsMobile(width <= 768);
  }, [width]);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    const loadAllCompressionTests = async () => {
      try {
        if (user) {
          const { data } = await api.get('compressionTests');
          if (data) {
            const hasWarnings = data.find((c) => c.hasWarning);
            setHasNotification(!!hasWarnings);
          }
        }
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
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
      {isMobile ? (
        <div
          style={{
            display: 'flex',
            height: '56px',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ width: '30%' }}>
            <Link to="/">
              <img src={logo} alt="logo" style={{ width: '100%' }} />
            </Link>
          </div>
          <div
            style={{
              width: '30%',
              display: 'flex',

              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <span style={{ fontWeight: '600', display: 'block' }}>
              HJVA Ltda
            </span>
          </div>
          <div
            style={{
              width: '30%',
              display: 'flex',

              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Link to="/">
              <MdCall />
            </Link>
            <ReactWhatsapp
              number="+55 67992251148"
              message="Hola"
              style={{ border: 'none', background: 'none' }}
            >
              <IoLogoWhatsapp />
            </ReactWhatsapp>
            <Link to="/location">
              <MdPlace />
            </Link>
          </div>
        </div>
      ) : (
        <Content hasNotification={hasNotification}>
          <nav>
            <Link to="/">
              <img src={logo} alt="HJVA" />
              <span>Comércio y Construcciones HVA Ltda</span>
            </Link>
          </nav>
          <MiddleContent>
            <div>
              <Link to="/">
                <MdCall />
              </Link>
              <ReactWhatsapp
                number="+55 67992251148"
                message="Hola"
                style={{ border: 'none', background: 'none' }}
              >
                <IoLogoWhatsapp />
              </ReactWhatsapp>

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
                  hasError={hasError}
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
      )}
    </Container>
  );
}
