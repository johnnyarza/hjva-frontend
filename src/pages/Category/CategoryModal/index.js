import React, { useEffect, useRef } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { Container } from './styles';

import GenericModal from '../../../components/GenericModal';
import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';

import utils from '../../../utils';

function CategoryModal({
  initialData = {},
  onEscPress,
  onCancelClick,
  onSubmit,
  categories,
  ...rest
}) {
  const formRef = useRef(null);

  useEffect(() => {
    formRef.current.setData(initialData);
  }, [initialData]);

  const isNameInUse = (name) => {
    if (!!name && categories?.length) {
      if (
        categories.find(
          (p) => utils.ciEquals(p.name, name) && p.id !== initialData?.id
        )
      ) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = async (data) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nombre vacío'),
      });
      await schema.validate(data, { abortEarly: false });

      if (isNameInUse(data.name)) {
        formRef.current.setFieldError('name', 'Nombre en uso');
        return;
      }

      onSubmit(utils.clean({ ...initialData, ...data }));
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
  };

  return (
    <Container>
      <GenericModal isOpen {...rest} onEscPress={onEscPress}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>
            {`${initialData?.id ? 'Editar' : 'Crear'} Proveedor`}
          </h2>
          <Input
            name="name"
            placeholder="Nome"
            onChange={() => formRef.current.setFieldError('name', '')}
            hasBorder={false}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10px',
            }}
          >
            <button
              type="submit"
              name="inserir"
              style={{ backgroundColor: '#2ecc71' }}
            >
              Ok
            </button>
            <button
              type="button"
              name="cancelar"
              style={{ backgroundColor: '#C0392B' }}
              onClick={onCancelClick}
            >
              Cancelar
            </button>
          </div>
        </Form>
      </GenericModal>
    </Container>
  );
}

export default CategoryModal;

CategoryModal.propTypes = {
  initialData: PropTypes.shape({ name: PropTypes.string }).isRequired,
  onEscPress: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
