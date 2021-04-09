import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import GenericModal from '../GenericModal';
import { Container, Content } from './style';
import Select from '../Select';

export default function RemoveCategoryModal(
  initialData,
  onCancelPress,
  categories,
  onSubmit,
  products,
  ...rest
) {
  const formRef = useRef(null);
  const [catNames, setCatNames] = useState([]);

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
        <Form onSubmit={onSubmit}>
          <Select
            name="category"
            optionsData={catNames}
            placeHolder="Categoria"
          />
          <button type="submit">Apagar</button>
          <button
            type="button"
            name="inserir"
            style={{ backgroundColor: '#C0392B' }}
            onClick={handleCancel}
          >
            Cancelar
          </button>
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
