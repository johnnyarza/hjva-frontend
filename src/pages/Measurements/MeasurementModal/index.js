import React, { useEffect, useRef } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { Container } from './styles';

import GenericModal from '../../../components/GenericModal';
import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';
import Label from '../../../components/Label';

import utils from '../../../utils';

function MeasureModal({
  initialData = {},
  onEscPress,
  onCancelClick,
  onSubmit,
  measurements,
  ...rest
}) {
  const formRef = useRef(null);

  useEffect(() => {
    formRef.current.setData(initialData);
  }, [initialData]);

  const isNameInUse = (abbreviation) => {
    if (!!abbreviation && measurements?.length) {
      if (
        measurements.find(
          (p) =>
            utils.ciEquals(p.abbreviation, abbreviation) &&
            p.id !== initialData?.id
        )
      ) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = async (data) => {
    try {
      const schema = Yup.object().shape({
        abbreviation: Yup.string().required('Abreviatura vacía'),
      });

      await schema.validate(data, { abortEarly: false });

      if (isNameInUse(data.abbreviation)) {
        formRef.current.setFieldError('abbreviation', 'Abreviatura en uso');
        return;
      }

      onSubmit(utils.clean({ ...initialData, ...data }));
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      } else {
        toast.error('Erro al crear unidad');
      }
    }
  };

  return (
    <Container>
      <GenericModal isOpen {...rest} onEscPress={onEscPress}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>
            {`${initialData?.id ? 'Editar' : 'Crear'} Proveedor`}
          </h2>
          <Label
            htmlFor="abbreviation"
            label={initialData.abbreviation ? 'Abreviatura' : ''}
          >
            <Input
              maxLength="3"
              name="abbreviation"
              placeholder="Abreviatura"
              onChange={() => formRef.current.setFieldError('abreviatura', '')}
              hasBorder={false}
            />
          </Label>
          <Label
            htmlFor="notes"
            label={initialData.abbreviation ? 'Descripción' : ''}
          >
            <TextArea
              name="notes"
              placeholder="Descripción"
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
      </GenericModal>
    </Container>
  );
}

export default MeasureModal;

MeasureModal.propTypes = {
  initialData: PropTypes.shape({ name: PropTypes.string }).isRequired,
  onEscPress: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  measurements: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
