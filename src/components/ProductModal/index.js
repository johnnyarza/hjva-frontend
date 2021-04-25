import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { CircularProgressbar } from 'react-circular-progressbar';

import { uniqueId } from 'lodash';
import { MdClose } from 'react-icons/md';
import Loader from 'react-loader-spinner';
import GenericModal from '../GenericModal';
import Input from '../Input';
import TextArea from '../TextArea';
import Select from '../Select';

import { Content } from './style';
import Empty from '../Empty';

const defaultProdUrl =
  'https://images.unsplash.com/photo-1573871924474-04f515cf7399?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';

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
  const [files, setFiles] = useState([]);
  const [filesToDelete, setFilesToDelete] = useState([]);
  const [fileIndex, setFileIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    formRef.current.setData(initialData);
    const { id } = initialData;
    if (id) {
      setProductId(id);
      if (initialData.file.length) {
        const newFiles = initialData.file.map((file) => ({
          ...file,
          isNew: false,
          toDelete: false,
        }));
        setFiles(newFiles);
      }
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
      setIsSaving(true);
      onSubmit({ data, files: [...files, ...filesToDelete] });
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

  const productFilePath = useCallback(() => {
    if (files.length) {
      return files[fileIndex].url;
    }
    return defaultProdUrl;
  }, [files, fileIndex]);

  const handleImgChange = useCallback(
    (to = 'next') => {
      if (files.length) {
        let index = fileIndex;

        if (to === 'next') {
          index += 1;
        } else {
          index -= 1;
        }

        if (index < 0) index = files.length - 1;
        if (index > files.length - 1) index = 0;
        setFileIndex(index);
      }
    },
    [fileIndex, files.length]
  );

  const handleAddImg = (inputFiles) => {
    const uploadFiles = [];

    for (let i = 0; i < inputFiles.length; i++) {
      const file = inputFiles[i];

      uploadFiles.push({
        file,
        id: uniqueId(),
        name: file.name,
        url: URL.createObjectURL(file),
        isNew: true,
        toDelete: false,
      });
    }
    const concatedFiles = uploadFiles.concat(files);
    setFiles(concatedFiles);
    setFileIndex(0);
  };

  const handleDeleteImg = () => {
    const newFiles = files.filter((f) => files[fileIndex].id !== f.id);
    const newFilesToDelete = files.filter((f) => files[fileIndex].id === f.id);
    newFilesToDelete.forEach((f) => {
      f.toDelete = true;
    });

    setFiles(newFiles);
    setFilesToDelete(newFilesToDelete.concat(filesToDelete));
    setFileIndex(0);
  };

  return (
    <GenericModal isOpen {...rest}>
      <Content>
        <h1>{title}</h1>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div className="form-content">
            <div className="product-inputs-container">
              <div className="img-div">
                <button
                  className="prev-img"
                  type="button"
                  onClick={() => handleImgChange('prev')}
                >
                  {'<'}
                </button>
                {files?.length ? (
                  <img src={productFilePath()} alt="UserAvatar" />
                ) : (
                  <MdClose style={{ width: '100%', height: 'auto' }} />
                )}

                <button
                  className="next-img"
                  type="button"
                  onClick={handleImgChange}
                >
                  {'>'}
                </button>
                <div className="img-buttons-container">
                  <label htmlFor="file">
                    +
                    <input
                      type="file"
                      id="file"
                      multiple
                      onChange={(f) => handleAddImg(f.target.files)}
                      accept="image/jpeg,
          image/pjpeg,
          image/png,
          image/gif"
                    />
                  </label>

                  <button
                    type="button"
                    style={{ backgroundColor: '#C0392B' }}
                    onClick={handleDeleteImg}
                  >
                    -
                  </button>
                </div>
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
                          <option value={o} key={uniqueId()}>
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
          <div style={{ maxHeight: '40px' }}>
            {isSaving ? (
              <Loader type="TailSpin" color="#00BFFF" height={30} width={30} />
            ) : (
              <>
                <button type="submit" name="inserir">
                  {okButtonText}
                </button>
                <button
                  type="button"
                  name="cancelar"
                  style={{ backgroundColor: '#C0392B' }}
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
              </>
            )}
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
