import React, { useState } from 'react';
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
  const [compressionTests] = compressionTestsState;

  return (
    <NotificationContainer hasNotification={hasNotification}>
      {isLoading ? (
        <Loader type="TailSpin" color="#00BFFF" height={25} width={25} />
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
      {!!showNotificationContent && (
        <NotificationContent
          onMouseLeave={() => setShowNotificationContent(false)}
        >
          <PerfectScrollbar style={{ maxHeight: '100px' }}>
            {compressionTests &&
              compressionTests.map((compressionTest) => {
                const { id, tracker } = compressionTest;

                return (
                  <Notification>
                    <div>
                      <Link to={`/compresionTest/${id}`} key={id}>
                        <div>
                          <h4>Aviso de probeta</h4>
                          <p>{`Ensayo nª ${tracker} tiene probeta(s) retrasada(s) o cerca de la fecha de rotura`}</p>
                        </div>
                      </Link>
                    </div>
                  </Notification>
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
    PropType.oneOfType([
      PropType.arrayOf(PropType.shape({})),
      PropType.func,
      PropType.string,
    ])
  ).isRequired,
};

Notifications.defaultProps = {
  hasError: false,
};

export default Notifications;
