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

export default function ProductModal({
  initialData,
  onCancelPress,
  categories,
  onSubmit,
  products,
  title,
  okButtonText,
  ...rest
}) {
  const formRef = useRef(null);
  const [catNames, setCatNames] = useState([]);
  const [productId, setProductId] = useState('');

  useEffect(() => {

    formRef.current.setData(initialData);
    const { id } = initialData;
    if (id) {
      setProductId(id);
    }
  }, [initialData]);

  useEffect(() => {
    const names = categories.map((c) => c.name);
    setCatNames(names);
  }, [categories]);

  const handleCancel = useCallback(() => {
    onCancelPress();
  }, [onCancelPress]);

  const productNameExists = useCallback(
    (name) => {
      const exists = products.find((p) => p.name === name);
      if (exists) {
        formRef.current.setFieldError('name', 'Nome já existe');
        throw Error('Nome do produto já existe');
      }
    },
    [products]
  );

  const handleSubmit = async (data) => {
    const schema = Yup.object().shape({
      id: Yup.string(),
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
      if (productId) {
        data.id = productId;
      }
      await schema.validate(data, { abortEarly: false });
      if (!productId) productNameExists(data.name);
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

  const productFilePath = () => {
    if (productId && products.length) {
      const product = products.find((p) => p.id === productId);
      console.log(product);
      if (product.file?.length) {
        return product.file[0].url;
      }
    }
    return 'https://images.unsplash.com/photo-1573871924474-04f515cf7399?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';
  };
  return (
    <GenericModal isOpen {...rest}>
      <Content>
        <h1>{title}</h1>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div className="form-content">
            <div className="product-inputs-container">
              <div className="img-div">
                <img src={productFilePath()} alt="bloco" />
              </div>
              <div className="inputs-container">
                <Input
                  name="name"
                  placeholder="Nome"
                  onChange={() => formRef.current.setFieldError('name', '')}
                  hasBorder={false}
                />
                <Select
                  name="category"
                  defaultValue={initialData.category || ''}
                >
                  <option value={initialData.category || ''} disabled>
                    {initialData.category || 'Categoria'}
                  </option>

                  {catNames.length &&
                    catNames.map((o) => {
                      if (o !== initialData.category) {
                        return (
                          <option value={o} key={`select-${o}`}>
                            {o}
                          </option>
                        );
                      }

                      return null;
                    })}
                </Select>
                <Input
                  name="price"
                  placeholder="Preço"
                  type="number"
                  hasBorder={false}
                  step="0.01"
                  min="0"
                  onChange={() => formRef.current.setFieldError('price', '')}
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
              {okButtonText}
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

ProductModal.propTypes = {
  initialData: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    category: PropTypes.string,
  }),
  onCancelPress: PropTypes.func,
  categories: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })
  ).isRequired,
  title: PropTypes.string,
  okButtonText: PropTypes.string,
};

ProductModal.defaultProps = {
  title: 'Adicionar Novo Produto',
  okButtonText: 'Criar',
  initialData: {},
  onCancelPress: () => {
    // nothing
  },
};
