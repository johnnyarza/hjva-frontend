import React, { useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import GenericModal from '../../../components/GenericModal';
import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';

import { Container } from './styles';
import ImagesSlide from '../../../components/ImagesSlide';
import Label from '../../../components/Label';

function PortifolioModal({
  initialData = {},
  setModalOpen,
  portifolioState,
  ...rest
}) {
  const formRef = useRef(null);
  const [portifolios, setPortifolios] = portifolioState;
  const toastError = (error, optMessage = 'Erro desconocído') => {
    toast.error(error?.response?.data?.message || error?.message || optMessage);
  };

  useEffect(() => {
    formRef.current.setData(initialData);
  }, [initialData]);

  const handleSubmit = async (data) => {
    try {
      const newData = { ...initialData, ...data };
      const { id } = newData;
      const schema = Yup.object().shape({
        title: Yup.string().required('Titulo vacío'),
      });

      await schema.validate(data, { abortEarly: false });
      let res;

      if (id) {
        res = await api.put(`portifolio/${id}`, data);
      }

      if (!id) {
        res = await api.post(`portifolio/`, data);
      }

      if (!res) throw Error('Response is empty');
      const { data: newPortifolio } = res;

      const oldPortifolios = portifolios.filter((p) => p.id !== id);
      const newPortifolios = [newPortifolio, ...oldPortifolios];
      setPortifolios(newPortifolios);

      setModalOpen(false);
      toast.success('Cambios guardados');
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

  const handleImages = (images) => {
    if (images) {
      const imagesToCreate = images.filter((file) => !!file.auxId);
      const imagesToDelete = images.filter((file) => file.id && file.toDelete);
      console.log(imagesToCreate);
    }
  };

  return (
    <Container>
      <GenericModal
        isOpen
        onEscPress={() => setModalOpen(false)}
        flexDirection="row"
        {...rest}
      >
        <Form ref={formRef} onSubmit={handleSubmit}>
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
                  setImages={(images) => {
                    handleImages(images);
                  }}
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
