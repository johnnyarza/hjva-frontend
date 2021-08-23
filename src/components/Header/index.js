import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from './style';
import Mobile from './MobileHeader/index';
import Desktop from './DesktopHeader/index';

import { signOut } from '../../store/modules/auth/actions';
import api from '../../services/api';

export default function Header({ mobileState }) {
  const [hasNotification, setHasNotification] = useState(false);
  const [isMobile] = mobileState;
  const [hasError, setHasError] = useState(false);
  const [pastDueCompressionTests, setPastDueCompressionTests] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadAllCompressionTests = async () => {
      setHasError(false);
      try {
        if (user) {
          const { data } = await api.get('compressionTests');
          if (data) {
            const hasWarnings = data.find((c) => c.hasWarning);
            setHasNotification(!!hasWarnings);
            setPastDueCompressionTests(data.filter((c) => c.hasWarning));
          }
        }
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setInterval(() => {
      loadAllCompressionTests();
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, [user]);

  const handleSignOut = useCallback(() => {
    dispatch(signOut(history));
  }, [history, dispatch]);

  return (
    <Container isMobile={isMobile}>
      {isMobile ? (
        <Mobile />
      ) : (
        <Desktop
          notificationState={[hasNotification, setHasNotification]}
          errorState={[hasError, setHasError]}
          loadingState={[isLoading, setIsLoading]}
          handleSignOut={handleSignOut}
          user={user}
          compressionTestsState={[
            pastDueCompressionTests,
            setPastDueCompressionTests,
          ]}
        />
      )}
    </Container>
  );
}

Header.propTypes = {
  mobileState: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
  ),
};
Header.defaultProps = {
  mobileState: [false, () => {}],
};
