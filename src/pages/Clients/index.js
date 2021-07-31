import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { MdDelete, MdEdit } from 'react-icons/md';
import api from '../../services/api';

import { Container, Content } from './styles';
import TopBar from '../../components/DinTopBar';
import ClientsTable from '../../components/Table';
import Spinner from '../../components/Spinner';
import COLUMNS from './ClientTable/columns';
import ClientModal from './ClientModal';
import utils from '../../utils';

function Clients() {
  let timeout;
  const [clients, setClients] = useState('');
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchField, setInputSearch] = useState('');
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  });

  useEffect(() => {
    const loadAllClients = async () => {
      const { data } = await api.get('clients');
      if (data?.length) {
        data.sort((a, b) => utils.naturalSortCompare(a.name, b.name));
      }
      setClients(data || []);
    };

    loadAllClients();
  }, []);

  useEffect(() => {
    if (clients) {
      if (!searchField) setFilteredClients(clients);
      setIsLoading(false);
    }
  }, [clients, searchField]);

  const deleteClient = useCallback(
    async (client) => {
      try {
        const { role } = (await api.get('user')).data;

        if (!role || !(role !== 'admin' || role !== 'office')) {
          toast.error('Usuário não tem privilégios');
          return;
        }

        await api.delete(`client/${client.id}`);

        const newClients = clients.filter((c) => c.id !== client.id);
        setClients(newClients);
        toast.success('Cliente deletado');
      } catch (error) {
        toast.error('Erro ao deletar');
      }
    },
    [clients]
  );

  const handleClientEditClick = (client) => {
    setCurrentClient(client);
    setIsClientModalOpen(true);
  };

  const handleClientEdit = async (client) => {
    try {
      let res;
      if (!client.id) {
        res = await api.post('client', utils.clean(client));
      }
      if (client.id) {
        res = await api.put(`client/${client.id}`, client);
      }
      if (!res) throw Error('response is empty');

      const { data: newClient } = res;
      const oldClients = clients.filter((c) => c.id !== newClient.id);
      const newClients = [newClient, ...oldClients];

      newClients.sort((a, b) => utils.naturalSortCompare(a.name, b.name));

      setClients(newClients);
      setIsClientModalOpen(false);
      toast.success(
        `Cliente ${client.id ? 'actualziado' : 'creado'} com exitô`
      );
    } catch (error) {
      setIsClientModalOpen(false);
      toast.error('Error al crear');
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
        <div className="edit-buttons-container">
          <button
            className="edit-button"
            type="button"
            onClick={() => handleClientEditClick(original)}
          >
            <MdEdit />
          </button>
          <button
            className="delete-button"
            type="button"
            onClick={() => deleteClient(original)}
          >
            <MdDelete />
          </button>
        </div>
      ),
    };
    return [...COLUMNS, newCol];
  }, [deleteClient]);

  const handleSearch = useCallback(() => {
    let filtered = clients;

    if (searchField) {
      const entries = Object.entries(searchField);
      const [field, value] = entries[0];

      if (value) {
        filtered = clients.filter((client) => {
          const valueToCompare = client[field];
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
      setTimeout(() => setFilteredClients(filtered), 350);
    }
  }, [clients, searchField]);

  useEffect(() => {
    handleSearch(searchField);
  }, [searchField, handleSearch, clients]);

  return (
    <>
      <Container>
        <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>Clientes</h2>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <TopBar
              onSearchInputChange={(data) => setInputSearch(data)}
              onCleanSearchButton={() => setFilteredClients(clients)}
              fields={[
                {
                  field: 'name',
                  label: 'Nombre',
                  inputProps: { type: 'text' },
                },
                {
                  field: 'email',
                  label: 'Correo',
                  inputProps: { type: 'email' },
                },
                {
                  field: 'phone',
                  label: 'Telefono',
                  inputProps: { type: 'number' },
                },
                {
                  field: 'address',
                  label: 'Ubicación',
                  inputProps: { type: 'text' },
                },
                {
                  field: 'updatedAt',
                  label: 'Actualizado',
                  inputProps: { type: 'date' },
                },
              ]}
              buttons={[
                {
                  label: 'Crear',
                  onClick: () => {
                    setCurrentClient({});
                    setIsClientModalOpen(true);
                  },
                },
              ]}
            />
            <Content>
              <ClientsTable data={filteredClients} columns={columns} />
            </Content>
          </>
        )}
      </Container>
      {isClientModalOpen && (
        <ClientModal
          clients={clients}
          onSubmit={(data) => {
            handleClientEdit(data);
          }}
          onCancelButton={() => setIsClientModalOpen(false)}
          initialData={currentClient}
          onEscPress={() => {
            setIsClientModalOpen(false);
          }}
        />
      )}
    </>
  );
}

export default Clients;
