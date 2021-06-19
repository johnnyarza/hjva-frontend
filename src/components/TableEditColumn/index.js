import React from 'react';
import { MdEdit, MdLock } from 'react-icons/md';
import PropType from 'prop-types';

import DeleteButton from '../DeleteButton';

import { Container } from './styles';

function TableEditColumn({
  onEditClick,
  onDeleteClick,
  original,
  userRole,
  hasDelete,
  hasEdit,
}) {
  return (
    <Container className="edit-buttons-container">
      {userRole === 'admin' ? (
        <>
          {hasEdit && (
            <button
              className="edit-button"
              type="button"
              onClick={() => onEditClick(original)}
            >
              <MdEdit />
            </button>
          )}
          {hasDelete && (
            <DeleteButton
              className="delete-button"
              onClick={() => onDeleteClick(original)}
            />
          )}
        </>
      ) : (
        <MdLock />
      )}
    </Container>
  );
}

TableEditColumn.propTypes = {
  onEditClick: PropType.func,
  onDeleteClick: PropType.func,
  userRole: PropType.string.isRequired,
  original: PropType.shape({}),
  hasDelete: PropType.bool,
  hasEdit: PropType.bool,
};

TableEditColumn.defaultProps = {
  onEditClick: () => {},
  onDeleteClick: () => {},
  original: {},
  hasDelete: false,
  hasEdit: false,
};

export default TableEditColumn;
