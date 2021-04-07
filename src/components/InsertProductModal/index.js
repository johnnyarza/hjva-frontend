import React, { useRef, useEffect } from 'react';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';

import GenericModal from '../GenericModal';
import Input from '../Input';

import { Content } from './style';

export default function InsertProductModal({ initialData, ...rest }) {
  const formRef = useRef(null);

  useEffect(() => {
    formRef.current.setData(initialData);
  }, [initialData]);

  const handleSubmit = () => {
    console.log('submit');
  };
  return (
    <GenericModal isOpen {...rest}>
      <Content>
        <h1>Adicionar Novo Produto</h1>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div>
            <img
              src="https://images.unsplash.com/photo-1573871924474-04f515cf7399?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
              alt="bloco"
            />
            <div>
              <Input name="name" placeholder="teste" />
              <Input name="details" placeholder="teste" />
              <Input name="price" placeholder="teste" type="number" />
            </div>
          </div>

          <button type="submit" name="inserir">
            Criar
          </button>
        </Form>
      </Content>
    </GenericModal>
  );
}

InsertProductModal.propTypes = {
  initialData: PropTypes.shape({ name: PropTypes.string }),
};

InsertProductModal.defaultProps = {
  initialData: {},
};
