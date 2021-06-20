import React, { useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PropType from 'prop-types';

import GenericModal from '../../../components/GenericModal';
import Label from '../../../components/Label';
import Input from '../../../components/Input';
import SearchbleList from '../../../components/SearchbleList';
import api from '../../../services/api';
import TextArea from '../../../components/TextArea';

// import { Container } from './styles';

function MaterialTransactionModal({
  initialData,
  listContentType,
  onCancelPress,
  transactionType,
  onSubmit,
  ...rest
}) {
  const [listContent, setListContent] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (initialData.id) {
      const person = initialData.client || initialData.provider;
      const formatedData = {
        ...initialData,
        person: { value: person.id, label: person.name },
      };
      setTransaction(formatedData);
    }
    setTransaction({});
  }, [initialData]);

  useEffect(() => {
    if (transaction) {
      formRef.current.setData(transaction);
    }
  }, [transaction]);

  useEffect(() => {
    const loadList = async () => {
      const { data } = await api.get(listContentType);
      data?.sort((a, b) =>
        a.name.localeCompare(b.name, undefined, {
          numeric: true,
          sensitivity: 'base',
        })
      );
      setListContent(data || []);
    };
    loadList();
  }, [listContentType]);

  const handleSubmit = async (formData) => {
    try {
      const { person } = formData;
      const schema = Yup.object().shape({
        entry: Yup.number()
          .notOneOf([0], 'Debe ser diferente de cero')
          .typeError('Insertar numero')
          .required(),
        person: Yup.object()
          .shape({
            value: Yup.string().required(),
            label: Yup.string().required(),
          })
          .required('Selecionar'),
      });

      await schema.validate(formData, { abortEarly: false });

      if (transactionType === 'in') formData.providerId = person.value;
      if (transactionType === 'out') formData.clientId = person.value;
      delete formData.person;
      onSubmit(formData);
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      } else {
        toast.error('Error al registrar');
      }
    }
  };
  const formatValues = () => {
    if (listContent) {
      return listContent?.map(({ name, id }) => ({
        label: name,
        value: id,
      }));
    }
    return [];
  };
  const inputRange = () => {
    if (transactionType === 'out') return { max: '0' };
    return { min: '0' };
  };
  return (
    <GenericModal isOpen {...rest}>
      <>
        <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>
          {`Registrar ${transactionType === 'in' ? 'Entrada' : 'Salida'}`}
        </h3>
        <Form ref={formRef} onSubmit={handleSubmit} id="teste">
          <Label
            label={`${transactionType === 'in' ? 'Entrada' : 'Salida'}`}
            htmlFor="quantity_per_m3"
          >
            <Input
              name="entry"
              id="entry"
              type="number"
              hasBorder={false}
              step=".01"
              onChange={() => formRef.current.setFieldError('entry', '')}
              {...inputRange()}
            />
          </Label>
          <Label
            label={`${transactionType === 'in' ? 'Proveedor' : 'Cliente'}`}
            htmlFor="person"
          >
            <SearchbleList
              name="person"
              values={formatValues()}
              onChange={() => formRef.current.setFieldError('person', '')}
            />
          </Label>
          <Label label="Observación" htmlFor="notes">
            <TextArea name="notes" />
          </Label>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10px',
            }}
          >
            <button type="submit" style={{ backgroundColor: '#2ecc71' }}>
              Ok
            </button>
            <button
              type="button"
              style={{ backgroundColor: '#e74c3c' }}
              onClick={() => onCancelPress()}
            >
              Cancelar
            </button>
          </div>
        </Form>
      </>
    </GenericModal>
  );
}

MaterialTransactionModal.propTypes = {
  onSubmit: PropType.func.isRequired,
  onCancelPress: PropType.func,
  transactionType: PropType.oneOf(['in', 'out']),
  initialData: PropType.objectOf(
    PropType.oneOf([
      {
        id: PropType.string,
        entry: PropType.string,
        notes: PropType.string,
        client: PropType.shape({ id: PropType.string, name: PropType.string }),
      },
      {
        id: PropType.string,
        entry: PropType.string,
        notes: PropType.string,
        provider: PropType.shape({
          id: PropType.string,
          name: PropType.string,
        }),
      },
    ])
  ),
  listContentType: PropType.oneOf(['clients', 'providers']),
};

MaterialTransactionModal.defaultProps = {
  onCancelPress: () => {},
  transactionType: 'in',
  initialData: {},
  listContentType: 'providers',
};

export default MaterialTransactionModal;
