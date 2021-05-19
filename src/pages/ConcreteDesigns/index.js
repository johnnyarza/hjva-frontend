import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

import SideBar from '../../components/SideBar';
import Table from '../../components/Table';
import Spinner from '../../components/Spinner';

import { Container, Content } from './styles';
import TopBar from './TopBar';
import COLUMNS from './Table/columns';
import ConcreteModal from './ConcreteDesignModal';

import api from '../../services/api';
import utils from '../../utils/index';

function ConcreteDesigns() {
  const [concreteDesigns, setConcreteDesigns] = useState(null);
  const [currentConcreteDesign, setCurrentConcreteDesign] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConcreteModalOpen, setIsConcreteModalOpen] = useState(false);

  useEffect(() => {
    const loadAllConcreteDesigns = async () => {
      const { data } = await api.get('concreteDesigns');
      if (data) {
        setConcreteDesigns(
          data.sort((a, b) => utils.naturalSortCompare(a.name, b.name))
        );
        setIsLoading(false);
      }
    };
    loadAllConcreteDesigns();
  }, []);

  const handleEditClick = useCallback((data) => {
    setCurrentConcreteDesign(data);
    setIsConcreteModalOpen(true);
  }, []);

  const handleDeleteClick = (data) => {
    console.log(data);
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
        <Container>
          <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>
            Dosificaciones
          </h2>
          <TopBar
            onNewButton={() => {
              setCurrentConcreteDesign({});
              setIsConcreteModalOpen(true);
            }}
          />
          <Content>
            <Table columns={columns} data={concreteDesigns} />
          </Content>
        </Container>
      )}
      {isConcreteModalOpen && (
        <ConcreteModal
          onEscPress={() => setIsConcreteModalOpen(false)}
          initialData={currentConcreteDesign}
          onCancelButton={() => setIsConcreteModalOpen(false)}
          onSubmit={(data) => console.log(data)}
        />
      )}
    </>
  );
}

export default ConcreteDesigns;
