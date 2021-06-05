import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import { MdDelete, MdEdit } from 'react-icons/md';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

import Loader from 'react-loader-spinner';
import GenericModal from '../../../components/GenericModal';
import Label from '../../../components/Label';
import Input from '../../../components/Input';
import Table from '../../../components/Table';

import { Content } from './styles';
import COLUMNS from './Table/columns';
import TextArea from '../../../components/TextArea';
import AddMaterialModal from './AddMaterialModal';

function ConcreteDesignModal({
  initialData,
  materials,
  onSubmit,
  onCancelButton,
  onEscPress,
  ...rest
}) {
  const [concreteDesignMaterial, setConcreteDesignMaterial] = useState([]);
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
  const [currentMaterialRow, setCurrentMaterialRow] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    formRef.current.setData(initialData);
  }, [initialData]);

  useEffect(() => {
    if (initialData.concreteDesignMaterial) {
      const mats = initialData.concreteDesignMaterial.map((c) => {
        c.toDelete = false;
        c.isNew = false;
        return c;
      });
      setConcreteDesignMaterial(mats);
    }
  }, [initialData]);

  const handleDelete = useCallback(
    (concreteDesign) => {
      try {
        let filteredDesigns;
        const { id, auxId } = concreteDesign;
        if (id) {
          filteredDesigns = concreteDesignMaterial.map((c) => {
            if (c.id === id) {
              c.toDelete = true;
              return c;
            }
            return c;
          });
        }

        if (auxId) {
          filteredDesigns = concreteDesignMaterial.filter((c) => {
            const { auxId: filterAuxId } = c;
            return auxId !== filterAuxId;
          });
        }

        setConcreteDesignMaterial(filteredDesigns);
      } catch (error) {
        toast.error(error.message);
      }
    },
    [concreteDesignMaterial]
  );

  const handleAddMaterialSubmit = (data) => {
    try {
      let newConcreteDesingMaterial;
      if (data.id) {
        newConcreteDesingMaterial = concreteDesignMaterial.map((c) => {
          if (c.id === data.id) {
            return data;
          }
          return c;
        });
      }

      if (!data.id) {
        data.auxId = uniqueId();
        newConcreteDesingMaterial = [...concreteDesignMaterial, data];
      }

      setConcreteDesignMaterial(newConcreteDesingMaterial);
      setIsMaterialModalOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (data) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nombre vacío'),
        slump: Yup.number()
          .typeError('Insertar numero')
          .required('Slump vacío'),
        notes: Yup.string(),
      });

      await schema.validate(data, { abortEarly: false });
      const newData = { ...initialData, ...data, concreteDesignMaterial };

      setIsSaving(true);
      onSubmit(newData);
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

  const filterMaterialsInUse = () => {
    let materialsNotInUse;
    const materialsInUse = concreteDesignMaterial
      .filter((c) => !(c.isNew && c.toDelete))
      .map(({ material }) => material);

    if (materialsInUse) {
      materialsNotInUse = materials.filter((m) => {
        if (
          concreteDesignMaterial.find(
            ({ material, toDelete }) => material.id === m.id && !toDelete
          )
        ) {
          return false;
        }
        return true;
      });
    }

    return materialsNotInUse;
  };

  const columns = useMemo(() => {
    const newCol = {
      Header: 'Editar',
      accessor: 'edit',

      width: 20,
      disableResize: true,
      disableSort: true,

      // eslint-disable-next-line react/prop-types
      Cell: ({ row: { original } }) => (
        <div
          className="edit-buttons-container"
          style={{ justifyContent: 'center' }}
        >
          <button
            className="edit-button"
            type="button"
            onClick={() => {
              setCurrentMaterialRow(original);
              setIsMaterialModalOpen(true);
            }}
          >
            <MdEdit />
          </button>
          <button
            className="delete-button"
            type="button"
            onClick={() => handleDelete(original)}
          >
            <MdDelete />
          </button>
        </div>
      ),
    };
    return [...COLUMNS, newCol];
  }, [handleDelete]);

  return (
    <GenericModal
      isOpen
      {...rest}
      onEscPress={isMaterialModalOpen ? () => {} : onEscPress}
    >
      <>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Content>
            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: '10px' }}>
                <Label htmlFor="name" label={initialData.name ? 'Nombre' : ''}>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Nombre"
                    onChange={() => formRef.current.setFieldError('name', '')}
                    hasBorder={false}
                    position="left"
                  />
                </Label>
                <Label htmlFor="slump" label={initialData.slump ? 'Slump' : ''}>
                  <Input
                    min="0"
                    step="0.01"
                    type="number"
                    id="slump"
                    name="slump"
                    placeholder="slump"
                    onChange={() => formRef.current.setFieldError('slump', '')}
                    hasBorder={false}
                    position="left"
                  />
                </Label>
                <Label
                  htmlFor="notes"
                  label={initialData.id ? 'Descripción' : ''}
                >
                  <TextArea
                    name="notes"
                    placeholder="Descripción"
                    onChange={() => formRef.current.setFieldError('notes', '')}
                  />
                </Label>
              </div>
              <div style={{ minWidth: '450px', position: 'relative' }}>
                <div className="materials-label">Materiales</div>
                <Table
                  columns={columns}
                  data={concreteDesignMaterial.filter((c) => !c.toDelete)}
                  id="materials"
                />
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '10px',
              }}
            >
              {isSaving ? (
                <Loader
                  type="TailSpin"
                  color="#00BFFF"
                  height={30}
                  width={30}
                />
              ) : (
                <>
                  <button
                    type="submit"
                    name="inserir"
                    style={{ backgroundColor: '#2ecc71' }}
                  >
                    {initialData.id ? 'Guardar' : 'Crear'}
                  </button>
                  <button
                    type="button"
                    className="add-material-button"
                    onClick={() => {
                      setIsMaterialModalOpen(true);
                      setCurrentMaterialRow({});
                    }}
                  >
                    Agregar Material
                  </button>
                  <button
                    type="button"
                    name="cancelar"
                    style={{ backgroundColor: '#e74c3c', fontWeight: '500' }}
                    onClick={onCancelButton}
                  >
                    Cancelar
                  </button>
                </>
              )}
            </div>
          </Content>
        </Form>
        {isMaterialModalOpen && (
          <AddMaterialModal
            onEscPress={() => setIsMaterialModalOpen(false)}
            osCancelPress={() => setIsMaterialModalOpen(false)}
            materialsInUse={concreteDesignMaterial.map(({ material }) => ({
              id: material.id,
              name: material.name,
            }))}
            data={filterMaterialsInUse()}
            initialData={currentMaterialRow}
            onSubmit={handleAddMaterialSubmit}
          />
        )}
      </>
    </GenericModal>
  );
}

ConcreteDesignModal.propTypes = {
  initialData: PropTypes.shape({
    id: PropTypes.string,
    slump: PropTypes.string,
    name: PropTypes.string,
    concreteDesignMaterial: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        material: PropTypes.shape({
          id: PropTypes.string.isRequired,
        }),
      })
    ),
  }),
  materials: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      notes: PropTypes.string,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancelButton: PropTypes.func.isRequired,
  onEscPress: PropTypes.func.isRequired,
};

ConcreteDesignModal.defaultProps = {
  initialData: {},
};

export default ConcreteDesignModal;
