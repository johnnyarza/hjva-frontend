import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Content } from './style';

export default function GenericModal({
  isOpen,
  onEscPress,
  flexDirection,
  children,
}) {
  const escFunction = useCallback(
    (event) => {
      if (event.keyCode === 27) {
        onEscPress();
      }
    },
    [onEscPress]
  );

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  return (
    <Container isOpen={isOpen}>
      <Content flexDirection={flexDirection}>{children}</Content>
    </Container>
  );
}

GenericModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onEscPress: PropTypes.func,
  children: PropTypes.element.isRequired,
  flexDirection: PropTypes.string,
};

GenericModal.defaultProps = {
  onEscPress: () => {
    // nothing
  },
  flexDirection: 'column',
};
