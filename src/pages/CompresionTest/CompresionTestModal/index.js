import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { uniqueId } from 'lodash';
import { toast } from 'react-toastify';

import { Container } from './style';

import SearchbleList from '../../../components/SearchbleList';
import GenericModal from '../../../components/GenericModal';
import Label from '../../../components/Label';
import Select from '../../../components/Select';
import TextArea from '../../../components/TextArea';

function CompresionTestModal({
  onSubmit,
  concreteDesigns,
  clients,
  initialData,
  onCancelClick,
  ...rest
}) {
  const formRef = useRef(null);
  const [compressionTest, setCompressionTest] = useState(null);

  useEffect(() => {
    setCompressionTest(initialData);
  }, [initialData]);

  useEffect(() => {
    if (compressionTest) {
      formRef.current.setData({
        ...compressionTest,
        client: compressionTest.client?.id,
        concreteProvider: compressionTest.concreteProvider?.id,
        concreteDesign: compressionTest.concreteDesign?.id,
      });
    }
  }, [compressionTest]);

  const handleSubmit = (data) => {
    try {
      onSubmit({ ...initialData, ...data });
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

  const formatClients = () => {
    if (clients) {
      return clients.map(({ id, name }) => ({
        value: id,
        label: name,
      }));
    }
    return [];
  };

  const formatConcreteProvider = () => {
    if (clients) {
      return clients.map(({ id, name }) => ({
        value: id,
        label: name,
      }));
    }
    return [];
  };

  const selectConcreteProvider = useCallback(() => {
    if (compressionTest) {
      const id = compressionTest?.concreteProvider?.id || '';

      return (
        <Label
          htmlFor="concreteProvider"
          label={compressionTest?.id ? 'Prov. Hormig.' : ''}
        >
          <Select
            id="concreteProvider"
            name="concreteProvider"
            defaultValue={id}
          >
            <>
              <option value={id} disabled={!id}>
                {compressionTest.client?.name || 'Prov. Hormig.'}
              </option>

              {clients
                .filter((p) => id !== p.id)
                .map((p) => {
                  return (
                    <option value={p.id} key={uniqueId()}>
                      {p.name}
                    </option>
                  );
                })}
            </>
          </Select>
        </Label>
      );
    }
    return null;
  }, [clients, compressionTest]);

  const selectConcreteDesign = useCallback(() => {
    if (compressionTest) {
      const id = compressionTest?.concreteDesign?.id || '';

      return (
        <Label
          htmlFor="concreteDesign"
          label={compressionTest?.id ? 'Dosificación' : ''}
        >
          <Select id="concreteDesign" name="concreteDesign" defaultValue={id}>
            <>
              <option value={id} disabled={!id}>
                {compressionTest.concreteDesign?.name || 'Dosificación'}
              </option>

              {concreteDesigns
                .filter((p) => id !== p.id)
                .map((p) => {
                  return (
                    <option value={p.id} key={uniqueId()}>
                      {p.name}
                    </option>
                  );
                })}
            </>
          </Select>
        </Label>
      );
    }
    return null;
  }, [compressionTest, concreteDesigns]);

  return (
    <>
      <GenericModal isOpen {...rest}>
        <>
          <h3 style={{ marginBottom: '15px' }}>{`${
            compressionTest?.id ? 'Guardar' : 'Crear'
          } Ensayo`}</h3>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Label htmlFor="client" label="Cliente">
              <SearchbleList values={formatClients()} name="client" />
            </Label>
            <Label htmlFor="client" label="Prov. Horm.">
              <SearchbleList
                placeholder="Prov. Hormigón"
                values={formatClients()}
                name="concreteProvider"
              />
            </Label>

            {/* {selectClient()} */}
            {/* {selectConcreteProvider()} */}
            {selectConcreteDesign()}
            <Label
              htmlFor="notes"
              label={compressionTest?.notes ? 'Descripción' : ''}
            >
              <TextArea
                id="notes"
                name="notes"
                placeholder="Descripción"
                maxLength={255}
                onChange={() => formRef.current.setFieldError('notes', '')}
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
                onClick={onCancelClick}
              >
                Cancelar
              </button>
            </div>
          </Form>
        </>
      </GenericModal>
    </>
  );
}

CompresionTestModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    id: PropTypes.string,
    notes: PropTypes.string,
  }),
  clients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  concreteDesigns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
};

CompresionTestModal.defaultProps = {
  initialData: {},
};

export default CompresionTestModal;
