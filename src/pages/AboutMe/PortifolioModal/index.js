import React, { useEffect, useRef } from 'react';
import { Form } from '@unform/web';

import { toast } from 'react-toastify';
import GenericModal from '../../../components/GenericModal';

import { Container } from './styles';

function PortifolioModal({ initialData = {}, setModalOpen }) {
  const formRef = useRef(null);

  useEffect(() => {
    formRef.current.setData(initialData);
  }, [initialData]);

  const handleSubmit = async (data) => {
    try {
      console.log(data);
      toast.success('Erro ao criar o produto');
    } catch (error) {
      toast.error('Erro ao criar o produto');
    }
  };

  return (
    <Container>
      <GenericModal isOpen>
        <Form ref={formRef} onSubmit={handleSubmit}>
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
