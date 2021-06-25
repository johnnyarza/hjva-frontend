import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  MdAddCircleOutline,
  MdEdit,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import { toast } from 'react-toastify';

import SimpleConfirmationModal from '../../components/SimpleConfirmationModal';
import SideBar from '../../components/SideBar';
import DeleteButton from '../../components/DeleteButton';
import Spinner from '../../components/Spinner';
import Table from '../../components/Table';
import Empty from '../../components/Empty';

import api from '../../services/api';
import utils from '../../utils';

import { Container, Content } from './styles';
import StockTopBar from './TopBar';
import MaterialModal from './StockModal';
import COLUMNS from './Table/columns';
import MaterialTransactionModal from './MaterialTransactionModal';

function Stock() {
  let timeout;
  const { locale } = useSelector((state) => state.locale);
  const [materials, setMaterials] = useState(null);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [searchInput, setSeachInput] = useState('');
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

  const handleEditClick = useCallback((data) => {
    setCurrentMaterial(data);
    setIsMaterialModalOpen(true);
  }, []);

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
    setCurrentMaterial({});
    setIsMaterialModalOpen(true);
  };

  const updateMaterial = (body) => {
    return api.put(`material/${body.id}`, body);
  };

  const handleUpdateMaterial = async (body) => {
    try {
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
      const newMaterial = (await storeMaterial(body)).data;
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
    let foundMaterials = materials;
    const { material: searchMaterial } = searchInput;
    const { category } = searchInput;
    const { createdAt } = searchInput;
    if (searchMaterial) {
      foundMaterials = materials.filter(({ name }) => {
        if (!name) return false;
        const currentName = name.toLowerCase();
        const newName = searchInput.material.name.toLowerCase();
        return currentName.includes(newName);
      });
    }
    if (category) {
      foundMaterials = materials.filter(({ material }) => {
        if (!material.category?.name) return false;
        const currentName = material.category.name.toLowerCase();
        const newName = category.name.toLowerCase();
        return currentName.includes(newName);
      });
    }
    if (createdAt) {
      const { from, to } = createdAt;
      if (from && to) {
        foundMaterials = materials.filter(({ updated_at: date }) => {
          return utils.isBetweenDates(from, to, date);
        });
      }
    }
    setTimeout(() => setFilteredMaterials(foundMaterials), 350);
  }, [materials, searchInput]);

  useEffect(() => {
    if (searchInput) handleSearch(searchInput);
  }, [searchInput, handleSearch]);

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
            <StockTopBar
              onNewButton={handleNewButtonClick}
              onInputChange={(data) => setSeachInput(data)}
              onCleanButton={() => setFilteredMaterials(materials)}
            />
            <Content>
              {filteredMaterials.length ? (
                <Table columns={columns} data={filteredMaterials} />
              ) : (
                <Empty />
              )}
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
