import React, { useEffect, useRef } from 'react';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { format } from 'date-fns-tz';
import { addDays, startOfDay } from 'date-fns';
import PropTypes from 'prop-types';

import GenericModal from '../../../../components/GenericModal';
import Label from '../../../../components/Label';
import TextArea from '../../../../components/TextArea';
import Input from '../../../../components/Input';
import DateInput from './DateInput';
// import { Container } from './styles';

function ConcreteSampleModal({
  onSubmit,
  initalData = {},
  onCancelPress,
  ...rest
}) {
  const formRef = useRef(null);

  useEffect(() => {
    let parsedInitialData = {};
    if (initalData.id) {
      parsedInitialData = {
        ...initalData,
        sampledAt: format(
          startOfDay(new Date(initalData.sampledAt)),
          'yyyy-MM-dd'
        ),
        loadedAt: format(
          startOfDay(new Date(initalData.loadedAt)),
          'yyyy-MM-dd'
        ),
      };
    }
    formRef.current.setData(parsedInitialData);
  }, [initalData]);

  const handleSubmit = async (data) => {
    try {
      const body = { ...initalData, ...data };
      const schema = Yup.object().shape({
        slump: Yup.number().typeError('Insertar Slump').required('Slump vacío'),
        weight: Yup.number().typeError('Insertar Peso').required('Peso vacío'),
        notes: Yup.string(),
        load: Yup.number()
          .typeError('Insertar Tonelada')
          .required('Tonelada vacía'),
        height: Yup.number()
          .typeError('Insertar Altura')
          .required('Altura vacía'),
        diameter: Yup.number()
          .typeError('Insertar diametro')
          .required('Diametro vacío'),
        sampledAt: Yup.date()
          .typeError('Insertar Fecha')
          .required('Fecha vacía'),
        loadedAt: Yup.date()
          .typeError('Insertar Fecha')
          .required('Fecha vacía'),
      });
      await schema.validate(body, { abortEarly: false });

      body.sampledAt = startOfDay(
        new Date(body.sampledAt.replaceAll('-', '/'))
      );
      body.loadedAt = startOfDay(new Date(body.loadedAt.replaceAll('-', '/')));

      onSubmit(body);
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      } else {
        toast.error('Erro al criar probeta');
      }
    }
  };

  const handleDateCalc = (days) => {
    const inputSampledDate = formRef.current.getFieldValue('sampledAt');
    if (inputSampledDate && !!days) {
      const newDate = addDays(
        startOfDay(new Date(inputSampledDate.replaceAll('-', '/'))),
        days
      );

      formRef.current.setFieldValue('loadedAt', format(newDate, 'yyyy-MM-dd'));
    }
  };
  return (
    <GenericModal isOpen {...rest}>
      <>
        <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>
          {`${initalData?.id ? 'Editar' : 'Crear'} Probeta`}
        </h2>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Label htmlFor="slump" label="Slump (cm)">
            <Input
              id="slump"
              name="slump"
              placeholder="slump (cm)"
              onChange={() => formRef.current.setFieldError('slump', '')}
              hasBorder={false}
              type="number"
              step="0.001"
              min="0"
            />
          </Label>
          <Label htmlFor="sampledAt" label="Moldeo">
            <Input
              id="sampledAt"
              name="sampledAt"
              onChange={() => formRef.current.setFieldError('sampledAt', '')}
              hasBorder={false}
              type="date"
            />
          </Label>
          <Label htmlFor="loadedAt" label="Rotura">
            <DateInput
              id="loadedAt"
              name="loadedAt"
              onChange={() => formRef.current.setFieldError('loadedAt', '')}
              hasBorder={false}
              type="date"
              onCalcClick={handleDateCalc}
            />
          </Label>
          <Label htmlFor="diameter" label="Diametro (cm)">
            <Input
              id="diameter"
              name="diameter"
              placeholder="Diametro (cm)"
              onChange={() => formRef.current.setFieldError('diameter', '')}
              hasBorder={false}
              type="number"
              step="0.001"
              min="0"
            />
          </Label>
          <Label htmlFor="height" label="Altura (cm)">
            <Input
              id="height"
              name="height"
              placeholder="Altura (cm)"
              onChange={() => formRef.current.setFieldError('height', '')}
              hasBorder={false}
              type="number"
              step="0.001"
              min="0"
            />
          </Label>
          <Label htmlFor="weight" label="Peso (kg)">
            <Input
              id="weight"
              name="weight"
              placeholder="Peso (kg)"
              onChange={() => formRef.current.setFieldError('weight', '')}
              hasBorder={false}
              type="number"
              step="0.001"
              min="0"
            />
          </Label>
          <Label htmlFor="load" label="Ton">
            <Input
              id="load"
              name="load"
              placeholder="Rotura (ton)"
              onChange={() => formRef.current.setFieldError('load', '')}
              hasBorder={false}
              type="number"
              step="0.001"
              min="0"
            />
          </Label>

          <Label htmlFor="notes" label="Descripción">
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
              onClick={onCancelPress}
            >
              Cancelar
            </button>
          </div>
        </Form>
      </>
    </GenericModal>
  );
}

ConcreteSampleModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancelPress: PropTypes.func.isRequired,
  initalData: PropTypes.shape({
    id: PropTypes.string,
    tracker: PropTypes.number,
    days: PropTypes.number,
  }),
};

ConcreteSampleModal.defaultProps = {
  initalData: {},
};

export default ConcreteSampleModal;
