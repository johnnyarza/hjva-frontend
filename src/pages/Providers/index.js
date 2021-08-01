import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';

import ProviderTable from '../../components/Table';
import Spinner from '../../components/Spinner';

import TopBar from '../../components/DinTopBar';

import COLUMNS from './ProviderTable/columns';
import ProviderModal from './ProviderModal';
import { Container, Content } from './styles';

import api from '../../services/api';
import utils from '../../utils';
import DeleteButton from '../../components/DeleteButton';

function Providers() {
  const [searchField, setSearchField] = useState('');
  const [providers, setProviders] = useState('');
  const [filteredProviders, setFilteredProviders] = useState('');
  const [currentProvider, setCurrentProvider] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isModalProviderShow, setIsModalProviderShow] = useState(false);

  useEffect(() => {
    const loadAllProviders = async () => {
      const { data } = await api.get('providers');

      if (data) {
        data.sort((a, b) => utils.naturalSortCompare(a.name, b.name));
        setProviders(data);
      }
    };
    loadAllProviders();
  }, []);

  useEffect(() => {
    if (providers) {
      if (!searchField) setFilteredProviders(providers);
      setIsLoading(false);
    }
  }, [providers, searchField]);

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
        newProviders.sort((a, b) => utils.naturalSortCompare(a.name, b.name));
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
      const { data: updatedProvider } = await updateProvider(provider);
      if (updatedProvider) {
        const newProviders = providers.map((p) => {
          if (p.id === updatedProvider.id) {
            return updatedProvider;
          }
          return p;
        });
        newProviders.sort((a, b) => utils.naturalSortCompare(a.name, b.name));
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
          <DeleteButton onClick={() => handleDeleteClick(original)} />
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

  const handleSearch = useCallback(() => {
    let filtered = providers;
    if (searchField) {
      const entries = Object.entries(searchField);
      const [field, value] = entries[0];

      if (value) {
        filtered = providers.filter((provider) => {
          const valueToCompare = provider[field];
          if (!valueToCompare) return false;
          if (field === 'updatedAt') {
            const { from, to } = value;
            if (from && to) {
              return utils.isBetweenDates(from, to, valueToCompare);
            }
            return false;
          }

          return valueToCompare.toLowerCase().includes(value.toLowerCase());
        });
      }
      setTimeout(() => setFilteredProviders(filtered), 350);
    }
  }, [providers, searchField]);

  useEffect(() => {
    handleSearch();
  }, [searchField, handleSearch, providers]);

  return (
    <>
      <Container>
        <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>
          Proveedores
        </h2>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <TopBar
              onCleanSearchButton={() => setFilteredProviders(providers)}
              onSearchInputChange={(data) => setSearchField(data)}
              buttons={[{ label: 'Crear', onClick: handleNewButton }]}
              fields={[
                {
                  field: 'name',
                  label: 'Nombre',
                  inputProps: { type: 'text' },
                },
                {
                  field: 'updatedAt',
                  label: 'Fecha',
                  inputProps: { type: 'date' },
                },
                {
                  field: 'phone',
                  label: 'Telefono',
                  inputProps: { type: 'text' },
                },
                {
                  field: 'email',
                  label: 'Correo E.',
                  inputProps: { type: 'text' },
                },
                {
                  field: 'address',
                  label: 'Ubicación',
                  inputProps: { type: 'text' },
                },
              ]}
            />
            <Content>
              <ProviderTable data={filteredProviders} columns={columns} />
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
