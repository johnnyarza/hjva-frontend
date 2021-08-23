import React, { useState, useEffect } from 'react';
import { MdErrorOutline, MdNotifications } from 'react-icons/md';
import Loader from 'react-loader-spinner';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropType from 'prop-types';

import { Link } from 'react-router-dom';
import {
  NotificationContainer,
  NotificationContent,
  Notification,
} from './styles';

function Notifications({
  isLoading,
  hasNotification,
  hasError,
  compressionTestsState,
}) {
  const [showNotificationContent, setShowNotificationContent] = useState(false);
  const [compressionTests, setCompressionTests] = compressionTestsState;

  useEffect(() => {
    console.log(compressionTests);
  }, [compressionTests]);

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
      {!!(showNotificationContent && compressionTests) && (
        <NotificationContent>
          <PerfectScrollbar style={{ maxHeight: '80px' }}>
            {compressionTests.map((compressionTest) => {
              const { id } = compressionTest;
              return (
                <Link to={`/compresionTest/${id}`} key={id}>
                  <Notification>
                    <h4>Aviso de probeta</h4>
                    <p>Probetas retrasadas o con fecha proximas</p>
                  </Notification>
                </Link>
              );
            })}
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
  compressionTestsState: PropType.arrayOf(
    PropType.oneOfType([PropType.arrayOf(PropType.shape({})), PropType.func])
  ).isRequired,
};

Notifications.defaultProps = {
  hasError: false,
};

export default Notifications;
