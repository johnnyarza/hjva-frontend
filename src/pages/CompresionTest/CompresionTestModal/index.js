import React, { useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { Content } from './style';

import Label from '../../../components/Label';
import GenericModal from '../../../components/GenericModal';
import SearchableList from '../../../components/SearchbleList';
import Spinner from '../../../components/Spinner';
import api from '../../../services/api';
import TextArea from '../../../components/TextArea';

function CompressionTestModal({
  onSubmit,
  initialData,
  onCancelClick,
  ...rest
}) {
  const formRef = useRef(null);
  const [clients, setClients] = useState(null);
  const [concreteDesigns, setConcreteDesigns] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [compressionTest, setCompressionTest] = useState('');

  useEffect(() => {
    setIsloading(!(clients && concreteDesigns));
  }, [clients, concreteDesigns]);

  useEffect(() => {
    const loadAllCLients = async () => {
      const { data } = await api.get('clients');
      const formatedData = data.map(({ id, name }) => ({
        label: name,
        value: id,
      }));
      setClients(formatedData);
    };
    loadAllCLients();
  }, []);

  useEffect(() => {
    const loadAllConcreteDesigns = async () => {
      const { data } = await api.get('concreteDesigns');
      const formatedData = data.map(({ id, name }) => ({
        label: name,
        value: id,
      }));
      setConcreteDesigns(formatedData);
    };
    loadAllConcreteDesigns();
  }, []);

  useEffect(() => {
    if (initialData.id) {
      const formatedData = {
        id: initialData.id,
        notes: initialData.notes,
        client: {
          value: initialData.client.id,
          label: initialData.client.name,
        },
        concreteProvider: {
          value: initialData.concreteProvider.id,
          label: initialData.concreteProvider.name,
        },
        concreteDesign: {
          value: initialData.concreteDesign.id,
          label: initialData.concreteDesign.name,
        },
      };
      setCompressionTest(formatedData);
    }
  }, [initialData, isLoading]);

  useEffect(() => {
    if (compressionTest) {
      formRef.current?.setData(compressionTest);
    }
  }, [compressionTest, isLoading]);

  useEffect(() => {
    setIsloading(!(clients && concreteDesigns));
  }, [clients, concreteDesigns]);

  const handleSubmit = async (formData) => {
    try {
      const schema = Yup.object().shape({
        id: Yup.string(),
        notes: Yup.string(),
        client: Yup.object()
          .typeError('Vacío')
          .shape({
            label: Yup.string(),
            value: Yup.string(),
          })
          .required('Cliente es obligatorio'),
        concreteDesign: Yup.object()
          .typeError('Vacío')
          .shape({
            label: Yup.string(),
            value: Yup.string(),
          })
          .required('Cliente es obligatorio'),
        concreteProvider: Yup.object()
          .typeError('Vacío')
          .shape({
            label: Yup.string(),
            value: Yup.string(),
          })
          .required('Cliente es obligatorio'),
      });
      await schema.validate(formData, { abortEarly: false });
      formRef.current.setErrors({});
      const body = {
        ...compressionTest,
        client: formData.client.value,
        concreteDesign: formData.concreteDesign.value,
        concreteProvider: formData.concreteProvider.value,
        notes: formData.notes,
      };
      onSubmit(body);
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
        <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>
          {`${compressionTest?.id ? 'Guardar' : 'Crear'} Ensayo`}
        </h2>
        {isLoading ? (
          <Spinner />
        ) : (
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Label label="Cliente" htmlFor="client">
              <SearchableList
                name="client"
                id="client"
                values={clients}
                onChange={() => formRef.current.setFieldError('client', '')}
              />
            </Label>
            <Label label="Prov. Hormigón" htmlFor="concreteProvider">
              <SearchableList
                id="concreteProvider"
                name="concreteProvider"
                values={clients}
                onChange={() =>
                  formRef.current.setFieldError('concreteProvider', '')
                }
              />
            </Label>
            <Label label="Dosificación" htmlFor="concreteDesign">
              <SearchableList
                id="concreteDesign"
                name="concreteDesign"
                values={concreteDesigns}
                onChange={() =>
                  formRef.current.setFieldError('concreteDesign', '')
                }
              />
            </Label>
            <Label htmlFor="notes" label="Observaciones">
              <TextArea
                id="notes"
                name="notes"
                placeholder="Observación"
                maxLength={255}
                onChange={() => formRef.current.setFieldError('notes', '')}
              />
            </Label>
            <div className="btn-container">
              <button type="submit" className="btn-ok">
                {`${compressionTest.id ? 'Guardar' : 'Crear'}`}
              </button>
              <button
                className="btn-cancel"
                type="button"
                onClick={onCancelClick}
              >
                Cancelar
              </button>
            </div>
          </Form>
        )}
      </Content>
    </GenericModal>
  );
}

CompressionTestModal.propTypes = {
  initialData: PropTypes.shape({
    id: PropTypes.string,
    notes: PropTypes.string,
    client: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
    concreteProvider: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
    concreteDesign: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func,
};

CompressionTestModal.defaultProps = {
  initialData: {},
  onCancelClick: () => {},
};

export default CompressionTestModal;
