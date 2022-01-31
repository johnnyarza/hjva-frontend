import React, { useEffect, useRef } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { Container } from './styles';

import GenericModal from '../../../components/GenericModal';
import TextArea from '../../../components/TextArea';
import utils from '../../../utils';

function ContactMeModal({
  initialData = {},
  onEscPress,
  onCancelButton,
  onSubmit,
  ...rest
}) {
  const formRef = useRef(null);
  useEffect(() => {
    formRef.current.setData(initialData);
  }, [initialData]);

  return (
    <Container>
      <GenericModal isOpen {...rest} onEscPress={onEscPress}>
        <Form ref={formRef} onSubmit={onSubmit}>
          <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>Editar</h2>

          <TextArea
            name="value"
            placeholder="Insertar texto"
            maxLength={255}
            onChange={() => formRef.current.setFieldError('value', '')}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10px',
              minWidth: '500px',
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

export default ContactMeModal;

ContactMeModal.propTypes = {
  initialData: PropTypes.shape({ name: PropTypes.string }).isRequired,
  onEscPress: PropTypes.func.isRequired,
  onCancelButton: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
