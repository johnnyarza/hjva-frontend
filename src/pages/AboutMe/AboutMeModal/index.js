import React, { useEffect, useState, useRef } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { Container } from './style';
import Modal from '../../../components/GenericModal';
import Label from '../../../components/Label';
import TextArea from '../../../components/TextArea';
import Setting from '../../../classes/Setting';

function AboutMeModal({
  initialData = new Setting(),
  setModalOpen = () => {},
  onSubmit = () => {},
}) {
  const formRef = useRef(null);
  const toastError = (error, optMessage = 'Erro desconocído') => {
    toast.error(error?.response?.data?.message || error?.message || optMessage);
  };

  useEffect(() => {
    formRef.current.setData(initialData);
  }, [initialData]);

  const handleSubmit = async (body) => {
    try {
      const { value } = body;
      const schema = Yup.object().shape({
        value: Yup.string().required('Insertar texto'),
      });
      await schema.validate(body, { abortEarly: false });
      onSubmit({ ...initialData, value });
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      } else {
        toastError(err);
      }
    }
  };
  return (
    <Container>
      <Modal isOpen>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>
              Editar
            </h2>
            <Label htmlFor="paragraph" label="Descrip.">
              <TextArea
                name="value"
                placeholder="Insertar texto"
                maxLength={255}
                onChange={() => formRef.current.setFieldError('paragraph', '')}
              />
            </Label>
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
          </div>
        </Form>
      </Modal>
    </Container>
  );
}

export default AboutMeModal;
