import React from 'react';
import PropTypes from 'prop-types';

import GenericModal from '../GenericModal';

import { DeleteConfirmationContainer } from './styles';

function SimpleConfirmationModal({
  onEscPress,
  onOkClick,
  onCancelClick,
  isOpen,
  ...rest
}) {
  return (
    <GenericModal {...rest} isOpen={isOpen} onEscPress={onEscPress}>
      <DeleteConfirmationContainer>
        <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>
          Seguro que desea apagar?
        </h3>
        <div>
          <button type="button" className="ok-btn" onClick={() => onOkClick()}>
            Ok
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => onCancelClick()}
          >
            Cancelar
          </button>
        </div>
      </DeleteConfirmationContainer>
    </GenericModal>
  );
}

export default SimpleConfirmationModal;

SimpleConfirmationModal.propTypes = {
  onEscPress: PropTypes.func.isRequired,
  onOkClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
