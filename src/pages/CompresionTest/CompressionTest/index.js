import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdEdit, MdVisibility } from 'react-icons/md';
import { toast } from 'react-toastify';

import CompressionTestsTable from '../../../components/Table';

import COLUMNS from '../Table/columns';
import TopBar from './CompressionTestTopBar';

import { Container, Content } from './style';

import Spinner from '../../../components/Spinner';
import CompresionTestModal from '../CompresionTestModal';
import utils from '../../../utils';

import api from '../../../services/api';
import DeleteButton from '../../../components/DeleteButton';

function CompresionTest() {
  const history = useHistory();
  const [searchInput, setSearchInput] = useState('');
  const { locale } = useSelector((state) => state.locale);
  const [compressionTests, setCompressionTests] = useState(null);
  const [filteredCompressionTests, setFilteredCompressionTests] = useState([]);
  const [concreteDesigns, setConcreteDesigns] = useState(null);
  const [currentCompressionTest, setCurrentCompressionTest] = useState('');
  const [clients, setClients] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompresionTestModalOpen, setIsCompresionTestModalOpen] = useState(
    false
  );

  useEffect(() => {
    const loadAllCompressionTests = async () => {
      const { data } = await api.get('compressionTests');
      setCompressionTests(data || []);
      setFilteredCompressionTests(data || []);
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
  }, [locale]);

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

  const handleUpdateCompressionTest = async (compressionTest) => {
    try {
      const {
        client: clientId,
        concreteDesign: concreteDesignId,
        concreteProvider: concreteProviderId,
        notes,
      } = compressionTest;
      const body = utils.clean({
        clientId,
        concreteDesignId,
        concreteProviderId,
        notes,
      });
      const { data } = await api.put(
        `compressionTest/${compressionTest.id}`,
        body
      );
      if (data) {
        const newCompressionTests = compressionTests.map((c) => {
          if (c.id === data.id) {
            return data;
          }
          return c;
        });
        setCompressionTests(newCompressionTests);
      }
      toast.success('Ensayo guardado con éxito');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = (compressionTest) => {
    try {
      const { id } = compressionTest;
      if (id) {
        handleUpdateCompressionTest(compressionTest);
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

  const handleEditClick = useCallback((original) => {
    setCurrentCompressionTest(original);
    setIsCompresionTestModalOpen(true);
  }, []);

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
              // eslint-disable-next-line react/prop-types
              onClick={() => history.push(`${original.id}`)}
            >
              <MdVisibility />
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
              onClick={() => handleDelete(original)}
            />
          </div>
        );
      },
    };
    const formatedCols = COLUMNS(locale);
    return [...formatedCols, newCol];
  }, [handleDelete, locale, history, handleEditClick]);

  const handleSearch = useCallback(() => {
    let foundCompressionTests = compressionTests;
    const { client } = searchInput;
    const { tracker } = searchInput;
    const { updatedAt } = searchInput;

    if (client) {
      foundCompressionTests = compressionTests.filter(
        ({ client: currentClient }) => {
          const currentName = currentClient.name.toLowerCase();
          const newName = client.name.toLowerCase();
          return currentName.includes(newName);
        }
      );
    }

    if (tracker && tracker > 0) {
      foundCompressionTests = compressionTests.filter(
        ({ tracker: currentTracker }) => {
          const currentName = String(currentTracker);
          const newName = String(tracker);
          return currentName.includes(newName);
        }
      );
    }

    if (updatedAt) {
      const { from, to } = updatedAt;
      if (from && to) {
        foundCompressionTests = compressionTests.filter(
          ({ updatedAt: date }) => {
            return utils.isBetweenDates(from, to, date);
          }
        );
      }
    }
    setTimeout(() => setFilteredCompressionTests(foundCompressionTests), 350);
  }, [compressionTests, searchInput]);

  useEffect(() => {
    if (searchInput) handleSearch();
  }, [searchInput, handleSearch]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Container>
          <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>Ensayos</h2>
          <TopBar
            onNewButton={() => {
              setCurrentCompressionTest({});
              setIsCompresionTestModalOpen(true);
            }}
            onInputChange={(data) => setSearchInput(data)}
            onCleanButton={() => setFilteredCompressionTests(compressionTests)}
          />
          <Content>
            <CompressionTestsTable
              columns={columns}
              data={filteredCompressionTests || []}
              showWarning
            />
          </Content>
        </Container>
      )}
      {isCompresionTestModalOpen && (
        <CompresionTestModal
          onEscPress={() => setIsCompresionTestModalOpen(false)}
          onCancelClick={() => setIsCompresionTestModalOpen(false)}
          initialData={currentCompressionTest}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}

export default CompresionTest;
