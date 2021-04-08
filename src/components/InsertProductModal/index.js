import React, { useRef, useEffect, useCallback } from 'react';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';

import GenericModal from '../GenericModal';
import Input from '../Input';
import TextArea from '../TextArea';

import { Content } from './style';

export default function InsertProductModal({
  initialData,
  onCancelPress,
  ...rest
}) {
  const formRef = useRef(null);

  useEffect(() => {
    formRef.current.setData(initialData);
  }, [initialData]);

  const handleCancel = useCallback(() => {
    onCancelPress();
  }, [onCancelPress]);

  const handleSubmit = (data) => {
    console.log(data);
  };
  return (
    <GenericModal isOpen {...rest}>
      <Content>
        <h1>Adicionar Novo Produto</h1>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div className="form-content">
            <img
              src="https://images.unsplash.com/photo-1573871924474-04f515cf7399?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
              alt="bloco"
            />
            <div className="product-inputs-container">
              <div className="inputs-container">
                <Input name="name" placeholder="Nome" />
                <Input name="category" placeholder="Categoria" />
                <Input name="price" placeholder="Preço" type="number" />
              </div>
              <div className="text-container">
                <TextArea
                  name="details"
                  placeholder="descrição"
                  maxlength={255}
                />
              </div>
            </div>
          </div>
          <div>
            <button type="submit" name="inserir">
              Criar
            </button>
            <button
              type="button"
              name="inserir"
              style={{ backgroundColor: '#C0392B' }}
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        </Form>
      </Content>
    </GenericModal>
  );
}

InsertProductModal.propTypes = {
  initialData: PropTypes.shape({ name: PropTypes.string }),
  onCancelPress: PropTypes.func,
};

InsertProductModal.defaultProps = {
  initialData: {},
  onCancelPress: () => {
    // nothing
  },
};
