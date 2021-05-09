import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';
import SideBar from '../../components/SideBar';

import ProviderTable from '../../components/Table';
import Spinner from '../../components/Spinner';

import TopBar from './TopBar';

import COLUMNS from './ProviderTable/columns';
import ProviderModal from './ProviderModal';
import { Container, Content } from './styles';

import api from '../../services/api';

function Providers() {
  const [providers, setProviders] = useState(null);
  const [currentProvider, setCurrentProvider] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isModalProviderShow, setIsModalProviderShow] = useState(false);

  useEffect(() => {
    const loadAllProviders = async () => {
      const { data } = await api.get('providers');
      if (data) {
        data.sort((a, b) => a.name.localeCompare(b.name));
        setProviders(data);
      }
    };
    loadAllProviders();
  }, []);

  useEffect(() => {
    if (providers) {
      setIsLoading(false);
    }
  }, [providers]);

  function clean(obj) {
    const propNames = Object.getOwnPropertyNames(obj);
    for (let i = 0; i < propNames.length; i++) {
      const propName = propNames[i];
      if (!obj[propName]) {
        delete obj[propName];
      }
    }
    return obj;
  }

  const storeProvider = (provider) => {
    return api.post(`provider`, provider);
  };

  const createProvider = async (provider) => {
    try {
      const cleanedProvider = clean(provider);

      const { data: newProvider } = await storeProvider(cleanedProvider);
      if (newProvider) {
        const newProviders = [...providers, newProvider];
        newProviders.sort((a, b) => a.name.localeCompare(b.name));
        setProviders(newProviders);
      }
      toast.success(`Proveedor creado con éxito`);
    } catch (error) {
      toast.error('Error al crear');
    }
  };

  const updateProvider = (provider) => {
    return api.put(`provider/${provider.id}`, provider);
  };

  const editProvider = async (provider) => {
    try {
      const cleanedProvider = clean(provider);
      const { data: updatedProvider } = await updateProvider(cleanedProvider);
      if (updatedProvider) {
        const newProviders = providers.map((p) => {
          if (p.id === updatedProvider.id) {
            return updatedProvider;
          }
          return p;
        });
        newProviders.sort((a, b) => a.name.localeCompare(b.name));
        setProviders(newProviders);
      }
      toast.success(`Proveedor guardado con éxito`);
    } catch (error) {
      toast.error('Error al guardar');
    }
  };

  const handleEditClick = useCallback((provider) => {
    setCurrentProvider(provider);
    setIsModalProviderShow(true);
  }, []);

  const deleteProvider = (provider) => {
    return api.delete(`provider/${provider.id}`);
  };

  const handleDeleteClick = useCallback(
    async (provider) => {
      try {
        const { data: affectedRows } = await deleteProvider(provider);
        if (affectedRows) {
          const newProviders = providers.filter((p) => p.id !== provider.id);
          setProviders(newProviders);
        }

        toast.success('Proveedor eliminado');
      } catch (error) {
        toast.error('Error al eliminar');
      }
    },
    [providers]
  );

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

  const handleNewButton = () => {
    setCurrentProvider({});
    setIsModalProviderShow(true);
  };

  const handleSubmit = (provider) => {
    try {
      if (provider.id) {
        editProvider(provider);
      }
      if (!provider.id) {
        createProvider(provider);
      }

      setIsModalProviderShow(false);
    } catch (error) {
      setIsModalProviderShow(false);
      toast.error(`Error al ${provider?.id ? 'guardar' : 'crear'} proveedor`);
    }
  };

  return (
    <>
      <SideBar />
      <Container>
        <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>
          Proveedores
        </h2>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <TopBar onNewButton={handleNewButton} />
            <Content>
              <ProviderTable data={providers} columns={columns} />
            </Content>
          </>
        )}
      </Container>
      {isModalProviderShow && (
        <ProviderModal
          providers={providers}
          onSubmit={handleSubmit}
          initialData={currentProvider}
          onCancelButton={() => {
            setIsModalProviderShow(false);
          }}
          onEscPress={() => {
            setIsModalProviderShow(false);
          }}
        />
      )}
    </>
  );
}

export default Providers;
