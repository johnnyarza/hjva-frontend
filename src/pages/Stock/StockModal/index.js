import React, { useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import utils from '../../../utils';
import SearchbleList from '../../../components/SearchbleList';
import GenericModal from '../../../components/GenericModal';

import { Container, Content } from './styles';
import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';
import Label from '../../../components/Label';
import ImagesSlide from '../../../components/ImagesSlide';
import ToggleSwitch from '../../../components/ToggleSwitch';

import api from '../../../services/api';

function StockModal({
  onEscPress,
  onSubmit,
  initialData,
  onCancelButton,
  materials,
  toggleDisabled,
  ...rest
}) {
  const formRef = useRef(null);
  const [material, setMaterial] = useState(null);
  const [files, setFiles] = useState('');
  const [providers, setProviders] = useState(null);
  const [categories, setCategories] = useState(null);
  const [measurements, setMeasurements] = useState(null);

  useEffect(() => {
    if (initialData.id) {
      const formatedData = {
        ...initialData,
        provider: {
          label: initialData.provider.name,
          value: initialData.provider.id,
        },
        measurement: {
          label: initialData.measurement.abbreviation,
          value: initialData.measurement.id,
        },
        category: {
          label: initialData.category.name,
          value: initialData.category.id,
        },
      };

      setMaterial(formatedData);
    } else setMaterial(initialData);
  }, [initialData]);

  useEffect(() => {
    if (material) {
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
        provider: Yup.object()
          .shape({
            label: Yup.string().required('vacío'),
            value: Yup.string().required(),
          })
          .typeError('Elegir proveedor')
          .required('vacío'),
        measurement: Yup.object()
          .shape({
            label: Yup.string().required(),
            value: Yup.string().required(),
          })
          .typeError('Elegir unidad')
          .required(),
        category: Yup.object()
          .shape({
            label: Yup.string().required(),
            value: Yup.string().required(),
          })
          .typeError('Elegir categoria')
          .required('Vacío'),
        notes: Yup.string(),
      });
      await schema.validate(data, { abortEarly: false });

      if (isNameInUse({ ...material, ...data })) {
        formRef.current.setFieldError('name', 'Nombre en uso');
        return;
      }

      const body = utils.clean({
        ...material,
        ...data,
        provider: data.provider.value,
        measurement: data.measurement.value,
        category: data.category.value,
        file: files,
      });

      formRef.current.setErrors({});
      onSubmit({ ...body, toSell: !!data.toSell.checked });
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

  const formatProviders = () => {
    if (providers) {
      return providers.map(({ id, name }) => ({ value: id, label: name }));
    }
    return [];
  };

  const formatMeasurement = () => {
    if (measurements) {
      return measurements.map(({ id, abbreviation }) => ({
        value: id,
        label: abbreviation,
      }));
    }
    return [];
  };

  const formatCategory = () => {
    if (categories) {
      return categories.map(({ id, name }) => ({
        value: id,
        label: name,
      }));
    }
    return [];
  };

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
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto auto',
                    columnGap: '10px',
                  }}
                >
                  <div
                    style={{
                      gridColumn: 1,
                      display: 'block',
                      placeSelf: 'center',
                    }}
                  >
                    <ImagesSlide
                      images={material.file}
                      setImages={(images) => setFiles(images)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="name" label="Nombre">
                      <Input
                        id="name"
                        name="name"
                        placeholder="Nome"
                        onChange={() =>
                          formRef.current.setFieldError('name', '')
                        }
                        hasBorder={false}
                      />
                    </Label>

                    <Label htmlFor="provider" label="Proveedor">
                      <SearchbleList
                        id="provider"
                        name="provider"
                        values={formatProviders()}
                        onChange={() =>
                          formRef.current.setFieldError('provider', '')
                        }
                      />
                      {/* <>{selectProvider()}</> */}
                    </Label>
                    <Label htmlFor="measurement" label="Unidad">
                      <SearchbleList
                        id="measurement"
                        name="measurement"
                        values={formatMeasurement()}
                        onChange={() =>
                          formRef.current.setFieldError('measurement', '')
                        }
                      />
                      {/* <>{selectMeasurement()}</> */}
                    </Label>

                    <Label htmlFor="category" label="Categoria">
                      <SearchbleList
                        id="category"
                        name="category"
                        values={formatCategory()}
                        onChange={() =>
                          formRef.current.setFieldError('category', '')
                        }
                      />
                      {/* <>{selectCategory()}</> */}
                    </Label>

                    <Label htmlFor="notes" label="Observaciones">
                      <TextArea
                        id="notes"
                        name="notes"
                        placeholder="Observación"
                        maxLength={255}
                        onChange={() =>
                          formRef.current.setFieldError('notes', '')
                        }
                      />
                    </Label>
                    <ToggleSwitch
                      name="toSell"
                      isChecked={!!material.toSell}
                      label="En venta"
                      toggleDisabled={toggleDisabled}
                    />

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
                  </div>
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
  toggleDisabled: PropTypes.bool,
  initialData: PropTypes.shape({
    id: PropTypes.string,
    provider: PropTypes.shape({ name: PropTypes.string, id: PropTypes.string }),
    category: PropTypes.shape({ name: PropTypes.string, id: PropTypes.string }),
    measurement: PropTypes.shape({
      abbreviation: PropTypes.string,
      id: PropTypes.string,
    }),
  }),
  materials: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,
  onEscPress: PropTypes.func.isRequired,
  onCancelButton: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

StockModal.defaultProps = {
  initialData: {},
  toggleDisabled: false,
};
