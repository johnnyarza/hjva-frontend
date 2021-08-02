import React, { useState } from 'react';
import { MdErrorOutline, MdNotifications } from 'react-icons/md';
import Loader from 'react-loader-spinner';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropType from 'prop-types';

import {
  NotificationContainer,
  NotificationContent,
  Notification,
} from './styles';

function Notifications({ isLoading, hasNotification, hasError }) {
  const [showNotificationContent, setShowNotificationContent] = useState(false);

  return (
    <NotificationContainer hasNotification={hasNotification}>
      {isLoading ? (
        <Loader type="TailSpin" color="#00BFFF" height={30} width={30} />
      ) : hasError ? (
        <MdErrorOutline />
      ) : (
        <button
          type="button"
          onClick={() => setShowNotificationContent(!showNotificationContent)}
        >
          <MdNotifications />
        </button>
      )}
      {showNotificationContent && (
        <NotificationContent>
          <PerfectScrollbar style={{ maxHeight: '80px' }}>
            <Notification>
              <h4>Aviso de probeta</h4>
              <p>Probetas retrasadas o con fecha proximas</p>
            </Notification>
            <Notification>
              <h4>Aviso de probeta</h4>
              <p>Probetas retrasadas o con fecha proximas</p>
            </Notification>
          </PerfectScrollbar>
        </NotificationContent>
      )}
    </NotificationContainer>
  );
}

Notifications.propTypes = {
  isLoading: PropType.bool.isRequired,
  hasNotification: PropType.bool.isRequired,
  hasError: PropType.bool,
};

Notifications.defaultProps = {
  hasError: false,
};

export default Notifications;
