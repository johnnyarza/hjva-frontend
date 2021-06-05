import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import { Link } from 'react-router-dom';

import { MdDelete, MdEdit, MdVisibility } from 'react-icons/md';
import { toast } from 'react-toastify';
import SideBar from '../../../components/SideBar';
import CompressionTestsTable from '../../../components/Table';

import COLUMNS from '../Table/columns';

import { Container, Content } from './style';
import { MenuContainer } from '../styles';

import Spinner from '../../../components/Spinner';
import CompresionTestModal from '../CompresionTestModal';
import utils from '../../../utils';

import api from '../../../services/api';

function CompresionTest({ handleViewCompressionTest }) {
  const [compressionTests, setCompressionTests] = useState(null);
  const [concreteDesigns, setConcreteDesigns] = useState(null);
  const [currentCompressionTest, setCurrentCompressionTest] = useState(null);
  const [clients, setClients] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompresionTestModalOpen, setIsCompresionTestModalOpen] = useState(
    false
  );

  useEffect(() => {
    const loadAllCompressionTests = async () => {
      const { data } = await api.get('compressionTests');
      setCompressionTests(data || []);
    };

    const loadAllClients = async () => {
      const { data } = await api.get('clients');
      setClients(data);
    };

    const loadAllConcreteDesigns = async () => {
      const { data } = await api.get('concreteDesigns');
      setConcreteDesigns(data);
    };

    loadAllCompressionTests();
    loadAllClients();
    loadAllConcreteDesigns();
  }, []);

  useEffect(() => {
    if (compressionTests && clients && concreteDesigns) {
      setIsLoading(false);
    }
  }, [compressionTests, clients, concreteDesigns]);

  const handleDelete = useCallback(
    async (compressionTest) => {
      try {
        await api.delete(`compressionTest/${compressionTest.id}`);
        const newCompressionTests = compressionTests.filter(
          (c) => c.id !== compressionTest.id
        );

        setCompressionTests(newCompressionTests);
        toast.success('Documento apagado con éxito');
      } catch (error) {
        toast.error(error.message);
      }
    },
    [compressionTests]
  );

  const handleCreateCompressionTest = async (compressionTest) => {
    try {
      const {
        concreteProvider: concreteProviderId,
        concreteDesign: concreteDesignId,
        client: clientId,
        notes,
      } = compressionTest;

      const { data } = await api.post(
        'compressionTest',
        utils.clean({
          concreteProviderId,
          concreteDesignId,
          clientId,
          notes,
        })
      );

      setCompressionTests([...compressionTests, data]);
      toast.success('Ensayo creado con éxito');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = (compressionTest) => {
    try {
      const { id } = compressionTest;
      if (id) {
        console.log(compressionTest);
      }
      if (!id) {
        handleCreateCompressionTest(compressionTest);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsCompresionTestModalOpen(false);
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
      Cell: ({ row: { original } }) => {
        return (
          <div
            className="edit-buttons-container"
            style={{ justifyContent: 'center' }}
          >
            <button
              className="edit-button"
              type="button"
              onClick={() => handleViewCompressionTest(original)}
            >
              <MdVisibility />
            </button>
            <button
              className="edit-button"
              type="button"
              onClick={() => {
                setCurrentCompressionTest(original);
                setIsCompresionTestModalOpen(true);
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
        );
      },
    };
    return [...COLUMNS, newCol];
  }, [handleDelete]);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Container>
          <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>
            Probetas
          </h2>
          <MenuContainer>
            <Menu
              menuButton={<MenuButton>Documento</MenuButton>}
              arrow="arrow"
              direction="bottom"
              viewScroll="initial"
            >
              <MenuItem
                onClick={() => {
                  setCurrentCompressionTest({});
                  setIsCompresionTestModalOpen(true);
                }}
              >
                Crear
              </MenuItem>
            </Menu>
            <Menu
              menuButton={<MenuButton>Registro</MenuButton>}
              arrow
              direction="bottom"
              viewScroll="initial"
            >
              <MenuItem onClick={() => console.log('clientes')}>
                Clientes
              </MenuItem>
              <MenuItem>Dosagens</MenuItem>
              <MenuItem>
                <Link to="/stock" style={{ color: 'black' }}>
                  Materiales
                </Link>
              </MenuItem>
              <MenuItem>Fornecedores</MenuItem>
            </Menu>
          </MenuContainer>

          <Content>
            <CompressionTestsTable
              columns={columns}
              data={compressionTests || []}
            />
          </Content>
        </Container>
      )}
      {isCompresionTestModalOpen && (
        <CompresionTestModal
          onEscPress={() => setIsCompresionTestModalOpen(false)}
          onCancelClick={() => setIsCompresionTestModalOpen(false)}
          clients={clients}
          initialData={currentCompressionTest}
          concreteDesigns={concreteDesigns}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}

export default CompresionTest;
