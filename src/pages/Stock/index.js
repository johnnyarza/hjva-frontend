import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';

import SideBar from '../../components/SideBar';
import Spinner from '../../components/Spinner';
import Table from '../../components/Table';
import api from '../../services/api';

import SimpleConfirmationModal from '../../components/SimpleConfirmationModal';

import { Container, Content } from './styles';

import TopBar from './TopBar';
import MaterialModal from './StockModal';
import COLUMNS from './Table/columns';

function Stock() {
  const [materials, setMaterials] = useState(null);
  const [currentMaterial, setCurrentMaterial] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAllMaterials = async () => {
      const { data } = await api.get('materials');
      if (data) {
        setMaterials(
          data.sort((a, b) =>
            a.name.localeCompare(b.name, undefined, {
              numeric: true,
              sensitivity: 'base',
            })
          )
        );
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
            onClick={() => handleEditClick(original)}
          >
            <MdEdit />
          </button>
          <button
            className="delete-button"
            type="button"
            onClick={() => handleDeleteClick(original)}
          >
            <MdDelete />
          </button>
        </div>
      ),
    };
    return [...COLUMNS, newCol];
  }, [handleDeleteClick, handleEditClick]);

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
        ...{ providerId: data.provider, categoryId: data.category },
      };

      delete body.provider;
      delete body.category;

      if (body.id) {
        handleUpdateMaterial(body);
      }
      if (!body.id) {
        handleCreateMaterial(body);
      }

      // setIsMaterialModalOpen(false);
    } catch (err) {
      // setIsMaterialModalOpen(false);
      toast.error(err.message);
    }
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
            <TopBar onNewButton={handleNewButtonClick} />
            <Content>
              <Table columns={columns} data={materials} />
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
        </>
      )}
    </>
  );
}

export default Stock;
