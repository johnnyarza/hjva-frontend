import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { IoLogoWhatsapp } from 'react-icons/io';
import {
  MdAccountCircle,
  MdCall,
  MdClose,
  MdPlace,
  MdInfo,
  MdEdit,
} from 'react-icons/md';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import { Content, MiddleContent } from './styles';

import Language from '../Language';
import Notifications from '../Notification';
import Modal from '../../GenericModal';
import api from '../../../services/api';

import logo from '../../../assets/HJVA-logo.png';
import WhatsAppFowardButton from '../../WhatsAppFowardButton';

export default function DesktopHeader({
  notificationState,
  loadingState,
  errorState,
  user,
  handleSignOut,
  compressionTestsState,
}) {
  const [hasNotification] = notificationState;
  const [hasError] = errorState;
  const [isLoading] = loadingState;
  const [userRole, setUserRole] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      const loadUserRole = async () => {
        const res = await api.get('/user');
        if (!res.data) {
          throw Error('Usuário não encontrado');
        }
        setUserRole(res.data.role);
      };
      loadUserRole();
    } catch (error) {
      // Nothing
    }
  }, []);

  return (
    <Content hasNotification={hasNotification}>
      <nav>
        <Link to="/">
          {/* TODO INSERT EDIT LOGO OPTION */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            {userRole === 'admin' && (
              <div style={{ position: 'absolute', right: '0px' }}>
                <MdEdit
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                />
              </div>
            )}

            <img src={logo} alt="HJVA" />
            <span>Comércio y Construcciones HVA Ltda</span>
          </div>
        </Link>
      </nav>
      <MiddleContent>
        <div>
          <Link to="/aboutMe">
            <MdInfo />
          </Link>
          <Link to="/contactMe">
            <MdCall />
          </Link>
          <WhatsAppFowardButton style={{ border: 'none', background: 'none' }}>
            <IoLogoWhatsapp />
          </WhatsAppFowardButton>

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
              compressionTestsState={compressionTestsState}
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
      {isModalOpen && (
        <Modal isOpen onEscPress={() => setIsModalOpen(false)}>
          <div />
        </Modal>
      )}
    </Content>
  );
}

DesktopHeader.propTypes = {
  compressionTestsState: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({})),
      PropTypes.func,
      PropTypes.string,
    ])
  ).isRequired,
  notificationState: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
  ),
  loadingState: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
  ),
  errorState: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
  ),
  user: PropTypes.shape({ name: PropTypes.string }),
  handleSignOut: PropTypes.func,
};
DesktopHeader.defaultProps = {
  notificationState: [false, () => {}],
  loadingState: [false, () => {}],
  errorState: [false, () => {}],
  user: '',
  handleSignOut: () => {},
};
