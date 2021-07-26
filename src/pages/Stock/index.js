import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  MdAddCircleOutline,
  MdEdit,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';

import { toast } from 'react-toastify';

import SimpleConfirmationModal from '../../components/SimpleConfirmationModal';
import SideBar from '../../components/SideBar';
import DeleteButton from '../../components/DeleteButton';
import Spinner from '../../components/Spinner';
import Table from '../../components/Table';
import Empty from '../../components/Empty';
import TopBar from '../../components/DinTopBar';

import api from '../../services/api';
import utils from '../../utils';

import { Container, Content } from './styles';
import MaterialModal from './StockModal';
import COLUMNS from './Table/columns';
import MaterialTransactionModal from './MaterialTransactionModal';

function Stock() {
  let timeout;
  const { locale } = useSelector((state) => state.locale);
  const [materials, setMaterials] = useState('');
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [currentMaterial, setCurrentMaterial] = useState(null);
  const [transactionListType, setTransactionListType] = useState('clients');
  const [transactionType, setTransactionType] = useState('in');
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
  const [
    isMaterialTransactionModalOpen,
    setIsMaterialTransactionModalOpen,
  ] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, [timeout]);

  useEffect(() => {
    const loadAllMaterials = async () => {
      const { data } = await api.get('materials');
      if (data) {
        const sortedData = data.sort((a, b) =>
          a.name.localeCompare(b.name, undefined, {
            numeric: true,
            sensitivity: 'base',
          })
        );
        setMaterials(sortedData);
        setFilteredMaterials(sortedData);
      }
    };

    loadAllMaterials();
  }, []);

  useEffect(() => {
    if (materials) {
      setIsLoading(false);
    }
  }, [materials]);

  const handleEditClick = useCallback(
    (data) => {
      setCurrentMaterial(materials.find((mat) => mat.id === data.id));
      setIsMaterialModalOpen(true);
    },
    [materials]
  );

  const handleDeleteClick = useCallback((data) => {
    setCurrentMaterial(data);
    setIsConfirmationModalOpen(true);
  }, []);

  const deleteMaterial = (material) => {
    return api.delete(`material/${material.id}`);
  };

  const handleDeleteMaterial = async () => {
    try {
      const { data: affectedRows } = await deleteMaterial(currentMaterial);
      if (affectedRows) {
        const newMaterials = materials.filter(
          (material) => material.id !== currentMaterial.id
        );
        setMaterials(newMaterials);
      }
      setIsConfirmationModalOpen(false);
      toast.success('Material apagado');
    } catch (error) {
      setIsConfirmationModalOpen(false);
      toast.error('Error al apagar');
    }
  };

  const columns = useMemo(() => {
    const newCol = {
      Header: 'Editar',
      accessor: 'edit',

      width: 25,
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
              setCurrentMaterial(original);
              setTransactionListType('providers');
              setTransactionType('in');
              setIsMaterialTransactionModalOpen(true);
            }}
          >
            <MdAddCircleOutline />
          </button>
          <button
            className="delete-button"
            type="button"
            onClick={() => {
              setCurrentMaterial(original);
              setTransactionListType('clients');
              setTransactionType('out');
              setIsMaterialTransactionModalOpen(true);
            }}
          >
            <MdRemoveCircleOutline />
          </button>
          <button
            className="edit-button"
            type="button"
            onClick={() => handleEditClick(original)}
          >
            <MdEdit />
          </button>
          <DeleteButton
            className="delete-button"
            onClick={() => handleDeleteClick(original)}
          />
        </div>
      ),
    };

    const cols = COLUMNS(locale);
    return [...cols, newCol];
  }, [handleDeleteClick, handleEditClick, locale]);

  const handleNewButtonClick = () => {
    setCurrentMaterial();
    setIsMaterialModalOpen(true);
  };

  const updateMaterial = (body) => {
    return api.put(`material/${body.id}`, body);
  };

  const handleMaterialFilesChanges = (materialId, files) => {
    const filesToCreate = files.filter((file) => !!file.auxId);
    const filesToDelete = files.filter((file) => file.id && file.toDelete);

    const promises = Promise.all(
      filesToCreate.map(({ file }) => {
        const data = new FormData();
        data.append('file', file);
        return api.post(`material/${materialId}/file`, data);
      }),
      filesToDelete.map(({ id }) => {
        return api.delete(`material/${id}/file`);
      })
    );

    return promises;
  };

  const handleUpdateMaterial = async (body) => {
    try {
      const { file: filesToChange } = body;
      if (filesToChange) {
        await handleMaterialFilesChanges(body.id, filesToChange);
      }

      const newMaterial = (await updateMaterial(body)).data;

      if (newMaterial) {
        const newMaterials = materials.map((m) => {
          if (m.id === newMaterial.id) {
            return newMaterial;
          }
          return m;
        });
        newMaterials.sort((a, b) =>
          a.name.localeCompare(b.name, undefined, {
            numeric: true,
            sensitivity: 'base',
          })
        );
        setMaterials(newMaterials);
        toast.success('Material guardado');
      }
    } catch (error) {
      toast.error('Error al guardar');
    }
  };

  const storeMaterial = (body) => {
    return api.post('material', body);
  };

  const handleCreateMaterial = async (body) => {
    try {
      const { file: filesToCreate } = body;
      let newMaterial = (await storeMaterial(body)).data;
      const { id } = newMaterial;
      if (filesToCreate && filesToCreate.length && id) {
        await handleMaterialFilesChanges(id, filesToCreate);
        newMaterial = (await api.get(`material/${id}`)).data;
      }

      if (newMaterial) {
        const newMaterials = [...materials, newMaterial];
        newMaterials.sort((a, b) =>
          a.name.localeCompare(b.name, undefined, {
            numeric: true,
            sensitivity: 'base',
          })
        );
        setMaterials(newMaterials);
        toast.success('Material criado');
      }
    } catch (error) {
      toast.error('Error al crear material');
    }
  };

  const handleSubmit = (data) => {
    try {
      // TO-DO terminar toSell field
      const body = {
        ...data,
        ...{
          providerId: data.provider,
          categoryId: data.category,
          measurementId: data.measurement,
        },
      };

      delete body.provider;
      delete body.category;
      delete data.measurement;

      if (body.id) {
        handleUpdateMaterial(body);
      }
      if (!body.id) {
        handleCreateMaterial(body);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsMaterialModalOpen(false);
    }
  };

  const handleMaterialTransactionSubmit = async (formData) => {
    try {
      const { id: materialId } = currentMaterial;
      const { data } = await api.post('materialTransaction', {
        materialId,
        ...formData,
      });

      if (data) {
        const { material } = data;
        const { id, stock_qty: stockQty } = material;
        const newMaterials = materials.map((m) => {
          if (m.id === id) {
            return { ...m, stockQty };
          }
          return m;
        });
        setMaterials(newMaterials);
      }

      toast.success('Registro realizado con éxito');
    } catch (error) {
      toast.error('Error al registrar');
    } finally {
      setIsMaterialTransactionModalOpen(false);
    }
  };

  const handleSearch = useCallback(() => {
    let filtered = materials;
    if (searchField) {
      const entries = Object.entries(searchField);
      const [field, value] = entries[0];

      filtered = materials.filter((material) => {
        const newMaterial = { ...material };

        newMaterial.category = material.category.name;
        newMaterial.provider = material.provider.name;
        newMaterial.measurement = material.measurement.abbreviation;

        const valueToCompare = newMaterial[field];
        if (!valueToCompare) return false;
        if (field === 'updatedAt' || field === 'updated_at') {
          const { from, to } = value;
          if (from && to) {
            return utils.isBetweenDates(from, to, valueToCompare);
          }
          return true;
        }

        return valueToCompare.toLowerCase().includes(value.toLowerCase());
      });
    }
    setTimeout(() => setFilteredMaterials(filtered), 350);
  }, [materials, searchField]);

  useEffect(() => {
    handleSearch();
  }, [searchField, handleSearch, materials]);

  const materialsHasWarnings = (materialsParam = []) => {
    let newMaterials = [...materialsParam];
    if (materialsParam && materialsParam.length) {
      newMaterials = materialsParam.map((mat) => {
        const { stockQty } = mat;
        if (stockQty <= 0) {
          return { ...mat, hasWarning: true };
        }
        return mat;
      });
    }
    return newMaterials;
  };

  return (
    <>
      <SideBar />

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Container>
            <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>
              Estoque
            </h2>
            <TopBar
              onSearchInputChange={(data) => setSearchField(data)}
              onCleanSearchButton={() => setFilteredMaterials(materials)}
              fields={[
                {
                  field: 'name',
                  label: 'Nombre',
                  inputProps: { type: 'text' },
                },
                {
                  field: 'category',
                  label: 'Categoria',
                  inputProps: { type: 'text' },
                },
                {
                  field: 'provider',
                  label: 'Proveedor',
                  inputProps: { type: 'text' },
                },
                {
                  field: 'measurement',
                  label: 'Unidad',
                  inputProps: { type: 'text' },
                },
                {
                  field: 'updated_at',
                  label: 'Actualizado',
                  inputProps: { type: 'date' },
                },
              ]}
              buttons={[
                {
                  label: 'Crear',
                  onClick: handleNewButtonClick,
                },
              ]}
            >
              <Menu
                menuButton={<MenuButton>Registro</MenuButton>}
                arrow
                direction="bottom"
                viewScroll="initial"
              >
                <MenuItem>
                  <Link to="/clients" style={{ color: 'black' }}>
                    Clientes
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/providers" style={{ color: 'black' }}>
                    Proveedores
                  </Link>
                </MenuItem>
              </Menu>
            </TopBar>
            <Content>
              <Table
                showWarning
                columns={columns}
                data={materialsHasWarnings(filteredMaterials) || []}
              />
            </Content>
          </Container>
          <SimpleConfirmationModal
            isOpen={isConfirmationModalOpen}
            onEscPress={() => setIsConfirmationModalOpen(false)}
            onCancelClick={() => setIsConfirmationModalOpen(false)}
            onOkClick={handleDeleteMaterial}
          />
          {isMaterialModalOpen && (
            <MaterialModal
              onEscPress={() => setIsMaterialModalOpen(false)}
              onCancelButton={() => setIsMaterialModalOpen(false)}
              initialData={currentMaterial}
              materials={materials}
              onSubmit={handleSubmit}
            />
          )}
          {isMaterialTransactionModalOpen && (
            <MaterialTransactionModal
              onEscPress={() => setIsMaterialTransactionModalOpen(false)}
              onCancelPress={() => setIsMaterialTransactionModalOpen(false)}
              listContentType={transactionListType}
              transactionType={transactionType}
              onSubmit={handleMaterialTransactionSubmit}
            />
          )}
        </>
      )}
    </>
  );
}

export default Stock;
