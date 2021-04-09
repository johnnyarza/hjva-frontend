import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import GenericModal from '../GenericModal';
import Input from '../Input';
import TextArea from '../TextArea';
import Select from '../Select';

import { Content } from './style';

export default function InsertProductModal({
  initialData,
  onCancelPress,
  categories,
  onSubmit,
  ...rest
}) {
  const formRef = useRef(null);
  const [catNames, setCatNames] = useState([]);

  useEffect(() => {
    formRef.current.setData(initialData);
  }, [initialData]);

  useEffect(() => {
    const names = categories.map((c) => c.name);
    setCatNames(names);
  }, [categories]);

  const handleCancel = useCallback(() => {
    onCancelPress();
  }, [onCancelPress]);

  const handleSubmit = async (data) => {
    const schema = Yup.object().shape({
      name: Yup.string()
        .min(1, 'Nome não pode ser vazio')
        .required('Nome é obrigatório'),
      price: Yup.number('Insira valor numérico').required(
        'Preço é obrigatório'
      ),
      description: Yup.string()
        .min(1, 'Descrição não pode ser vazia')
        .required('Descrição é obrigatória'),
    });
    try {
      // Verificar produtos com nomes iguais
      await schema.validate(data, { abortEarly: false });
      formRef.current.setErrors({});
      onSubmit(data);
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
    <GenericModal isOpen {...rest}>
      <Content>
        <h1>Adicionar Novo Produto</h1>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div className="form-content">
            <div className="product-inputs-container">
              <img
                src="https://images.unsplash.com/photo-1573871924474-04f515cf7399?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                alt="bloco"
              />
              <div className="inputs-container">
                <Input
                  name="name"
                  placeholder="Nome"
                  onChange={() => formRef.current.setFieldError('name', '')}
                  hasBorder={false}
                />
                <Select
                  name="category"
                  optionsData={catNames}
                  placeHolder="Categoria"
                />
                <Input
                  name="price"
                  placeholder="Preço"
                  type="number"
                  hasBorder={false}
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
            <TextArea
              name="description"
              placeholder="descrição"
              maxLength={255}
              onChange={() => formRef.current.setFieldError('description', '')}
            />
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
  categories: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

InsertProductModal.defaultProps = {
  initialData: {},
  onCancelPress: () => {
    // nothing
  },
};
