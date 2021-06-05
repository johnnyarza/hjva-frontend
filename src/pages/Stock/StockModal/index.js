import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import utils from '../../../utils';

import GenericModal from '../../../components/GenericModal';

import { Container, Content } from './styles';
import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';
import Select from '../../../components/Select';
import Label from '../../../components/Label';
import api from '../../../services/api';

function StockModal({
  onEscPress,
  onSubmit,
  initialData,
  onCancelButton,
  materials,
  ...rest
}) {
  const formRef = useRef(null);
  const [material, setMaterial] = useState(null);
  const [providers, setProviders] = useState(null);
  const [categories, setCategories] = useState(null);
  const [measurements, setMeasurements] = useState(null);

  useEffect(() => {
    setMaterial(initialData);
  }, [initialData]);

  useEffect(() => {
    if (material) {
      console.log(material);
      formRef.current.setData(material);
    }
  }, [material]);

  useEffect(() => {
    const loadProviders = async () => {
      const { data } = await api.get('providers');
      data?.sort((a, b) =>
        a.name.localeCompare(b.name, undefined, {
          numeric: true,
          sensitivity: 'base',
        })
      );
      setProviders(data || []);
    };

    const loadMeasurements = async () => {
      const { data } = await api.get('measurements');
      data?.sort((a, b) =>
        a.abbreviation.localeCompare(b.abbreviation, undefined, {
          numeric: true,
          sensitivity: 'base',
        })
      );
      setMeasurements(data || []);
    };

    loadProviders();
    loadMeasurements();
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      const { data } = await api.get('categories');
      if (data) {
        data.sort((a, b) =>
          a.name.localeCompare(b.name, undefined, {
            numeric: true,
            sensitivity: 'base',
          })
        );
        setCategories(data);
      }
    };
    loadCategories();
  }, []);

  const isNameInUse = ({ name, id } = {}) => {
    if (materials.find((m) => utils.ciEquals(m.name, name) && m.id !== id)) {
      return true;
    }

    return false;
  };

  const handleSubmit = async (data) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nombre es obligatorio'),
        provider: Yup.string().required('Proveedor es obligatorio'),
        category: Yup.string().required('Categoria es obligatoria'),
        notes: Yup.string(),
      });
      await schema.validate(data, { abortEarly: false });

      if (isNameInUse({ ...material, ...data })) {
        formRef.current.setFieldError('name', 'Nombre en uso');
        return;
      }

      formRef.current.setErrors({});
      onSubmit(utils.clean({ ...material, ...data }));
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

  const selectProvider = useCallback(() => {
    if (material && providers) {
      const id = material.provider?.id || '';
      console.log(id);
      return (
        <Select id="provider" name="provider" defaultValue={id}>
          <option value={id} disabled={!id}>
            {material.provider?.name || 'Proveedor'}
          </option>

          {providers
            .filter((p) => id !== p.id)
            .map((p) => {
              return (
                <option value={p.id} key={uniqueId()}>
                  {p.name}
                </option>
              );
            })}
        </Select>
      );
    }
    return null;
  }, [material, providers]);

  const selectMeasurement = useCallback(() => {
    if (material && measurements) {
      const id = material.measurement?.id || '';
      const measurement = material.measurement?.abbreviation;

      return (
        <Select id="measurement" name="measurement" defaultValue={id || ''}>
          <option value={id || ''} disabled={!id}>
            {measurement || 'Unidad'}
          </option>
          {measurements
            .filter((p) => id !== p.id)
            .map((p) => {
              return (
                <option value={p.id} key={uniqueId()}>
                  {p.abbreviation}
                </option>
              );
            })}
        </Select>
      );
    }
    return null;
  }, [material, measurements]);

  const selectCategory = useCallback(() => {
    if (material && categories) {
      const id = material.category?.id || '';
      const category = material.category?.name;

      return (
        <Select id="category" name="category" defaultValue={id || ''}>
          <option value={id || ''} disabled={!id}>
            {category || 'Categoria'}
          </option>
          {categories
            .filter((p) => id !== p.id)
            .map((p) => {
              return (
                <option value={p.id} key={uniqueId()}>
                  {p.name}
                </option>
              );
            })}
        </Select>
      );
    }
    return null;
  }, [material, categories]);

  return (
    <Container>
      {!material ? (
        ''
      ) : (
        <GenericModal isOpen {...rest} onEscPress={onEscPress}>
          <>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Content>
                <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>
                  {`${material?.id ? 'Editar' : 'Crear'} Material`}
                </h2>
                <Label htmlFor="name" label={material.name ? 'Nombre' : ''}>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Nome"
                    onChange={() => formRef.current.setFieldError('name', '')}
                    hasBorder={false}
                  />
                </Label>

                <Label
                  htmlFor="provider"
                  label={material.provider ? 'Proveedor' : ''}
                >
                  {selectProvider()}
                </Label>
                <Label
                  htmlFor="measurement"
                  label={material.measurement ? 'Unidad' : ''}
                >
                  {selectMeasurement()}
                </Label>

                <Label
                  htmlFor="category"
                  label={material.category ? 'Categoria' : ''}
                >
                  {selectCategory()}
                </Label>

                <Label
                  htmlFor="notes"
                  label={material.notes ? 'Observaciones' : ''}
                >
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
                    {`${material?.id ? 'Guardar' : 'Crear'}`}
                  </button>
                  <button
                    className="btn-cancel"
                    type="button"
                    onClick={onCancelButton}
                  >
                    Cancelar
                  </button>
                </div>
              </Content>
            </Form>
          </>
        </GenericModal>
      )}
    </Container>
  );
}

export default StockModal;

StockModal.propTypes = {
  initialData: PropTypes.shape({
    id: PropTypes.string,
    provider: PropTypes.shape({ name: PropTypes.string }),
    category: PropTypes.shape({ name: PropTypes.string }),
  }),
  materials: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,
  measurements: PropTypes.arrayOf(
    PropTypes.shape({
      abbreviation: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,
  onEscPress: PropTypes.func.isRequired,
  onCancelButton: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

StockModal.defaultProps = {
  initialData: {},
};
