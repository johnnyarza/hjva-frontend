import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import GenericModal from '../GenericModal';
import Input from '../Input';

import { Content } from './style';

export default function InsertCategoryModal({
  onSubmit,
  onCancelPress,
  categories,
  ...rest
}) {
  const formRef = useRef(null);

  const handleCancel = useCallback(() => {
    onCancelPress();
  }, [onCancelPress]);

  const nameAlreadyExists = useCallback(
    (name) => {
      const exists = categories.find((cat) => cat.name === name);
      if (exists) {
        formRef.current.setFieldError('name', 'Nome já existe');
        throw new Error('Nome já existe');
      }
    },
    [categories]
  );

  const handleSubmit = useCallback(
    async (data) => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().min(1).required('Nome é obrigatório'),
        });
        await schema.validate(data, { abortEarly: false });
        formRef.current.setErrors({});
        nameAlreadyExists(data.name);
        onSubmit(data);
      } catch (err) {
        const validationErrors = {};
        if (err instanceof Yup.ValidationError) {
          err.inner.forEach((error) => {
            validationErrors[error.path] = error.message;
          });
          formRef.current.setErrors(validationErrors);
        } else {
          toast.error('Erro ao criar o produto');
        }
      }
    },
    [onSubmit, nameAlreadyExists]
  );

  return (
    <GenericModal isOpen {...rest}>
      <Content>
        <h1>Criar Categoria de Produto</h1>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="name"
            hasBorder={false}
            placeholder="Nome da Categoria"
            onChange={() => formRef.current.setFieldError('name', '')}
          />
          <div>
            <button type="submit" name="inserir" className="ok-button">
              Criar
            </button>
            <button
              type="button"
              name="cancel"
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

InsertCategoryModal.propTypes = {
  initialData: PropTypes.shape({ name: PropTypes.string }),
  onCancelPress: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })
  ).isRequired,
};

InsertCategoryModal.defaultProps = {
  initialData: {},
  onCancelPress: () => {
    // nothing
  },
};
