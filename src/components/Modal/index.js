import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Content } from './style';

export default function ModalDialog({
  isOpen,
  onOkClick,
  onCancelClick,
  message,
  onEscPress,
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
      <Content>
        <span>{message}</span>
        <div>
          <button
            type="button"
            onClick={onOkClick}
            style={{ backgroundColor: '#27ae60' }}
          >
            Ok
          </button>
          <button
            type="button"
            onClick={onCancelClick}
            style={{ backgroundColor: '#c0392b' }}
          >
            Cancelar
          </button>
        </div>
      </Content>
    </Container>
  );
}

ModalDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onOkClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  onEscPress: PropTypes.func,
};

ModalDialog.defaultProps = {
  onEscPress: () => {
    // nothing
  },
};
