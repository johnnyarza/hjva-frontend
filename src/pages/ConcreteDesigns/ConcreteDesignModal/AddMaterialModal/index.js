import React, { useState, useRef, useEffect } from 'react';
import { Form } from '@unform/web';
import { uniqueId } from 'lodash';
import * as Yup from 'yup';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { MdInfoOutline } from 'react-icons/md';
import GenericModal from '../../../../components/GenericModal';
import Label from '../../../../components/Label';
import Input from '../../../../components/Input';

import { ListContainer, Row, SearchContainer, ToolTip } from './styles';

function AddMaterialModal({
  onSubmit,
  osCancelPress,
  initialData,
  data,
  ...rest
}) {
  const formRef = useRef(null);
  const [currentMaterial, setCurrentMaterial] = useState({});
  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [materialListHasError, setMaterialListHasError] = useState({
    hasError: false,
    message: '',
  });

  useEffect(() => {
    setMaterials(data || []);
    setFilteredMaterials(data || []);
    setCurrentMaterial(initialData.material || {});
    formRef.current.setData(initialData);
  }, [data, initialData]);

  const filterMaterials = (value = '') => {
    return materials.filter((m) =>
      m.name.toLowerCase().includes(value.toLowerCase())
    );
  };

  const hadleSearchInputChange = (value = '') => {
    setCurrentMaterial({});
    setTimeout(() => {
      setFilteredMaterials(filterMaterials(value));
    }, 500);
  };

  const handleSubmit = async (body) => {
    try {
      const design = {
        ...initialData,
        material: currentMaterial,
        ...body,
        isNew: !initialData.id,
        toDelete: false,
      };

      const schema = Yup.object().shape({
        quantity_per_m3: Yup.number('Insertar valor numerico')
          .min(0.01, 'Debe ser mayor que 0.01')
          .required('Cantidad vacía'),
      });

      await schema.validate(design, { abortEarly: false });

      if (!currentMaterial || !currentMaterial.id) {
        setMaterialListHasError({ hasError: true, message: 'Elegir Material' });
        return;
      }
      onSubmit(design);
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      } else {
        toast.error('Error al agregar material');
      }
    }
  };

  return (
    <GenericModal isOpen {...rest}>
      <>
        <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>
          Agregar material
        </h3>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          style={{ position: 'relative' }}
        >
          <Label label="Cantidad por m³" htmlFor="quantity_per_m3">
            <Input
              min="0"
              name="quantity_per_m3"
              id="quantity_per_m3"
              type="number"
              hasBorder={false}
              step=".01"
              onChange={() =>
                formRef.current.setFieldError('quantity_per_m3', '')
              }
            />
          </Label>
          <ToolTip hasError={materialListHasError.hasError}>
            <MdInfoOutline className="icon-error" />
            <span className="error-message">
              {materialListHasError.message}
            </span>
          </ToolTip>

          <Label htmlFor="materialList" label="Material">
            <ListContainer
              id="materialList"
              hasError={materialListHasError.hasError}
            >
              <SearchContainer>
                <div>
                  <input
                    onChange={(d) => {
                      hadleSearchInputChange(d.target.value);
                      setMaterialListHasError({ hasError: false });
                    }}
                  />
                  <FaSearch />
                </div>
              </SearchContainer>
              <ul>
                {materials &&
                  filteredMaterials.map((m) => {
                    const selected = m.id === currentMaterial?.id;
                    return (
                      <Row key={uniqueId()} selected={selected}>
                        <button
                          type="button"
                          id={m.id}
                          onClick={() => {
                            setCurrentMaterial(m);
                            setMaterialListHasError({ hasError: false });
                          }}
                        >
                          {`${m.name} (${m.measurement.abbreviation})`}
                        </button>
                      </Row>
                    );
                  })}
              </ul>
            </ListContainer>
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
              onClick={() => osCancelPress()}
            >
              Cancelar
            </button>
          </div>
        </Form>
      </>
    </GenericModal>
  );
}

AddMaterialModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  osCancelPress: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  initialData: PropTypes.shape({
    id: PropTypes.string,
    quantity_per_m3: PropTypes.string,
    material: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      notes: PropTypes.string,
      measurement: PropTypes.shape({
        id: PropTypes.string.isRequired,
        abbreviation: PropTypes.string.isRequired,
      }).isRequired,
    }),
  }),
};

AddMaterialModal.defaultProps = {
  initialData: {},
};

export default AddMaterialModal;
