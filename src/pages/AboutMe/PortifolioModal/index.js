import React, { useEffect, useRef } from 'react';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import GenericModal from '../../../components/GenericModal';
import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';

import { Container } from './styles';
import Images from '../../../components/Images';
import ImagesSlide from '../../../components/ImagesSlide';
import Label from '../../../components/Label';

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
      <GenericModal
        isOpen
        onEscPress={() => setModalOpen(false)}
        flexDirection="row"
        {...rest}
      >
        <Form ref={formRef} onSubmit={onSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>
              Editar
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto auto',
                columnGap: '10px',
              }}
            >
              <div
                style={{ gridColumn: 1, display: 'block', placeSelf: 'center' }}
              >
                <ImagesSlide
                  images={initialData.file}
                  setImages={(images) => {}}
                />
              </div>
              <div style={{ placeSelf: 'center' }}>
                <Label htmlFor="title" label="Titulo">
                  <Input
                    name="title"
                    placeholder="Nome"
                    onChange={() => formRef.current.setFieldError('title', '')}
                    hasBorder={false}
                  />
                </Label>
                <Label htmlFor="paragraph" label="Descrip.">
                  <TextArea
                    name="paragraph"
                    placeholder="Insertar texto"
                    maxLength={255}
                    onChange={() =>
                      formRef.current.setFieldError('paragraph', '')
                    }
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
            </div>
          </div>
        </Form>
      </GenericModal>
    </Container>
  );
}

export default PortifolioModal;
