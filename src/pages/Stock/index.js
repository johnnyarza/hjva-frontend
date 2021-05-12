import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { MdDelete, MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';
import SideBar from '../../components/SideBar';
import Spinner from '../../components/Spinner';
import Table from '../../components/Table';

import api from '../../services/api';

import { Container, Content, DeleteConfirmationContainer } from './styles';

import TopBar from './TopBar';
import COLUMNS from './Table/columns';
import GenericModal from '../../components/GenericModal';
import Input from '../../components/Input';
import SimpleConfirmationModal from '../../components/SimpleConfirmationModal';

function Stock() {
  const [materials, setMaterials] = useState(null);
  const [currentMaterial, setCurrentMaterial] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAllMaterials = async () => {
      const { data } = await api.get('materials');
      data.sort((a, b) => a.name.localeCompare(b.name));
      setMaterials(data);
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
            <TopBar />
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
        </>
      )}
    </>
  );
}

export default Stock;
