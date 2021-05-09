import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { MdDelete, MdEdit } from 'react-icons/md';
import SideBar from '../../components/SideBar';
import api from '../../services/api';

import { Container, Content } from './styles';
import TopBar from './TopBar';
import ClientsTable from '../../components/Table';
import Spinner from '../../components/Spinner';
import COLUMNS from './ClientTable/columns';
import ClientModal from './ClientModal';

function Clients() {
  const [clients, setClients] = useState(undefined);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAllClients = async () => {
      const { data } = await api.get('clients');
      if (data?.length) {
        data.sort((a, b) => a.name.localeCompare(b.name));
      }
      setClients(data || []);
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
        res = await api.post('client', client);
      }
      if (client.id) {
        res = await api.put(`client/${client.id}`, client);
      }
      if (!res) throw Error('response is empty');

      const { data: newClient } = res;
      const oldClients = clients.filter((c) => c.id !== newClient.id);
      const newClients = [newClient, ...oldClients];
      newClients.sort((a, b) => a.name.localeCompare(b.name));

      setClients(newClients);
      setIsClientModalOpen(false);
      toast.success(
        `Cliente ${client.id ? 'actualziado' : 'creado'} com exitô`
      );
    } catch (error) {
      setIsClientModalOpen(false);
      toast.error('Erro ao deletar');
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

  return (
    <>
      <SideBar />

      <Container>
        <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>Clientes</h2>
        {!isLoading && (
          <TopBar
            onNewButton={() => {
              setCurrentClient({});
              setIsClientModalOpen(true);
            }}
          />
        )}
        <Content>
          {isLoading ? (
            <Spinner />
          ) : (
            <ClientsTable data={clients} columns={columns} />
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
