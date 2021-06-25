import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { MdDelete, MdEdit } from 'react-icons/md';
import api from '../../services/api';

import { Container, Content } from './styles';
import TopBar from './TopBar';
import ClientsTable from '../../components/Table';
import Spinner from '../../components/Spinner';
import COLUMNS from './ClientTable/columns';
import ClientModal from './ClientModal';
import utils from '../../utils';

function Clients() {
  let timeout;
  const [clients, setClients] = useState(undefined);
  const [filteredClients, setFilteredClients] = useState([]);
  const [inputSearch, setInputSearch] = useState(undefined);
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
      setFilteredClients(data || []);
    };

    loadAllClients();
  }, []);

  useEffect(() => {
    if (clients) {
      setIsLoading(false);
    }
  }, [clients]);

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

  const hadleClientEdit = async (client) => {
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

  const handleSearch = useCallback(
    (searchInput) => {
      let foundClients = clients;
      const { name, email, phone, updatedAt } = searchInput;

      if (name) {
        foundClients = clients.filter(({ name: clientName }) => {
          if (!clientName) return false;
          const currentName = clientName.toLowerCase();
          const newName = name.toLowerCase();
          return currentName.includes(newName);
        });
      }
      if (email) {
        foundClients = clients.filter(({ email: clientEmail }) => {
          if (!clientEmail) return false;
          const currentName = clientEmail.toLowerCase();
          const newName = email.toLowerCase();
          return currentName.includes(newName);
        });
      }
      if (phone) {
        foundClients = clients.filter(({ phone: clientPhone }) => {
          if (!clientPhone) return false;
          const currentName = clientPhone.toLowerCase();
          const newName = phone.toLowerCase();
          return currentName.includes(newName);
        });
      }
      if (updatedAt) {
        const { from, to } = updatedAt;
        if (from && to) {
          foundClients = clients.filter(({ updatedAt: date }) => {
            return utils.isBetweenDates(from, to, date);
          });
        }
      }
      setTimeout(() => setFilteredClients(foundClients), 350);
    },
    [clients]
  );

  useEffect(() => {
    if (inputSearch) handleSearch(inputSearch);
  }, [inputSearch, handleSearch]);

  return (
    <>
      <Container>
        <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>Clientes</h2>
        {!isLoading && (
          <TopBar
            onNewButton={() => {
              setCurrentClient({});
              setIsClientModalOpen(true);
            }}
            onInputChange={(data) => setInputSearch(data)}
            onCleanButton={() => setFilteredClients(clients)}
          />
        )}
        <Content>
          {isLoading ? (
            <Spinner />
          ) : (
            <ClientsTable data={filteredClients} columns={columns} />
          )}
        </Content>
      </Container>
      {isClientModalOpen && (
        <ClientModal
          clients={clients}
          onSubmit={(data) => {
            hadleClientEdit(data);
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
