import React, { useEffect, useState, useRef } from 'react';
import { Form } from '@unform/web';

import { Container } from './style';
import Modal from '../../../components/GenericModal';
import Input from '../../../components/Input';
import Label from '../../../components/Label';
import TextArea from '../../../components/TextArea';

function AboutMeModal() {
  const formRef = useRef(null);
  return (
    <Container>
      <Modal isOpen>
        <Form ref={formRef}>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>
              Editar
            </h2>
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
                onChange={() => formRef.current.setFieldError('paragraph', '')}
              />
            </Label>
          </div>
        </Form>
      </Modal>
    </Container>
  );
}

export default AboutMeModal;
