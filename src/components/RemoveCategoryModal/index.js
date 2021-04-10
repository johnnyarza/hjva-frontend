import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import GenericModal from '../GenericModal';
import { Content } from './style';
import Select from '../Select';

export default function RemoveCategoryModal({
  initialData,
  onCancelPress,
  categories,
  onSubmit,
  products,
  ...rest
}) {
  const [catNames, setCatNames] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    formRef.current.setData(initialData);
  }, [initialData]);

  useEffect(() => {
    const names = categories.map((c) => c.name);
    setCatNames(names);
  }, [categories]);

  const handleCancel = useCallback(() => {
    onCancelPress();
  }, [onCancelPress]);

  return (
    <GenericModal isOpen {...rest}>
      <Content>
        <Form onSubmit={onSubmit} ref={formRef}>
          <Select
            name="category"
            optionsData={catNames}
            placeHolder="Categoria"
          />
          <div className="button-container">
            <button type="submit" className="ok-button">
              Apagar
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        </Form>
      </Content>
    </GenericModal>
  );
}

RemoveCategoryModal.propTypes = {
  initialData: PropTypes.shape({ name: PropTypes.string }),
  onCancelPress: PropTypes.func,
  categories: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  products: PropTypes.arrayOf({ id: PropTypes.string, name: PropTypes.string })
    .isRequired,
};

RemoveCategoryModal.defaultProps = {
  initialData: {},
  onCancelPress: () => {
    // nothing
  },
};
