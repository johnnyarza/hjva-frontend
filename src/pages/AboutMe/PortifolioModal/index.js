import React, { useEffect, useRef } from 'react';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import GenericModal from '../../../components/GenericModal';
import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';

import { Container } from './styles';
import Images from '../../../components/Images';

function PortifolioModal({
  initialData = {},
  setModalOpen,
  onSubmit,
  ...rest
}) {
  const formRef = useRef(null);

  useEffect(() => {
    formRef.current.setData(initialData);
  }, [initialData]);

  return (
    <Container>
      <GenericModal isOpen onEscPress={() => setModalOpen(false)} {...rest}>
        <Images images={initialData.file} />
        <Form ref={formRef} onSubmit={onSubmit}>
          <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>Editar</h2>

          <Input
            name="title"
            placeholder="Nome"
            onChange={() => formRef.current.setFieldError('title', '')}
            hasBorder={false}
          />
          <TextArea
            name="paragraph"
            placeholder="Insertar texto"
            maxLength={255}
            onChange={() => formRef.current.setFieldError('paragraph', '')}
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
              onClick={() => {
                setModalOpen(false);
              }}
            >
              Cancelar
            </button>
          </div>
        </Form>
      </GenericModal>
    </Container>
  );
}

export default PortifolioModal;
