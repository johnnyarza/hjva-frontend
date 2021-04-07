import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Content } from './style';

export default function GenericModal({ isOpen, onEscPress, children }) {
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
      <Content>{children}</Content>
    </Container>
  );
}

GenericModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onEscPress: PropTypes.func,
  children: PropTypes.element.isRequired,
};

GenericModal.defaultProps = {
  onEscPress: () => {
    // nothing
  },
};
