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

function ClientModal({
  initialData = {},
  onEscPress,
  onCancelButton,
  onSubmit,
  clients,
  ...rest
}) {
  const formRef = useRef(null);
  useEffect(() => {
    formRef.current.setData(initialData);
  }, [initialData]);

  const isNameInUse = (name) => {
    if (!!name && clients?.length) {
      if (
        clients.find(
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
        email: Yup.string().email('Correo invalido'),
      });
      await schema.validate(data, { abortEarly: false });

      if (isNameInUse(data.name)) {
        formRef.current.setFieldError('name', 'Nombre en uso');
        return;
      }

      onSubmit({ ...initialData, ...data });
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
            {`${initialData?.id ? 'Editar' : 'Crear'} Cliente`}
          </h2>
          <Input
            name="name"
            placeholder="Nome"
            onChange={() => formRef.current.setFieldError('name', '')}
            hasBorder={false}
          />
          <Input
            name="phone"
            placeholder="Tel."
            onChange={() => formRef.current.setFieldError('phone', '')}
            hasBorder={false}
          />
          <Input
            name="email"
            placeholder="Correo E."
            onChange={() => formRef.current.setFieldError('email', '')}
            hasBorder={false}
          />
          <Input
            name="address"
            placeholder="Ubicación"
            onChange={() => formRef.current.setFieldError('address', '')}
            hasBorder={false}
          />
          <TextArea
            name="notes"
            placeholder="Observación"
            maxLength={255}
            onChange={() => formRef.current.setFieldError('notes', '')}
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
              onClick={onCancelButton}
            >
              Cancelar
            </button>
          </div>
        </Form>
      </GenericModal>
    </Container>
  );
}

export default ClientModal;

ClientModal.propTypes = {
  initialData: PropTypes.shape({ name: PropTypes.string }).isRequired,
  onEscPress: PropTypes.func.isRequired,
  onCancelButton: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  clients: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
