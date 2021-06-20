import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { MdKeyboardBackspace } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import COLUMNS from './columns';

import TopBar from './TopBar';
import Spinner from '../../../components/Spinner';
import Table from '../../../components/Table';
import TableEditColumn from '../../../components/TableEditColumn';

import { Container, Content } from './styles';

import api from '../../../services/api';

function MaterialTransaction() {
  let timeout;
  const history = useHistory();
  const { locale } = useSelector((state) => state.locale);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState('');
  const [transactions, setTransactions] = useState(null);
  const [filteredTransactions, setFilteredTransactions] = useState(null);

  useEffect(() => {
    const loadRole = async () => {
      const { data } = await api.get('/user');

      if (data) {
        setUserRole(data.role);
      }
    };

    loadRole();
  }, []);

  useEffect(() => {
    const loadAllTransactions = async () => {
      const { data } = await api.get('materialTransactions');
      setTransactions(data || []);
      setFilteredTransactions(data || []);
    };
    loadAllTransactions();
  }, []);

  useEffect(() => {
    if (transactions) setIsLoading(false);
  }, [transactions]);

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, [timeout]);

  const handleEdit = useCallback((original) => {
    console.log(original);
  }, []);

  const handleDelete = useCallback(
    async (original) => {
      try {
        const { id } = original;
        const affectedRows = await api.delete(`materialTransaction/${id}`);
        if (affectedRows) {
          setTransactions(transactions.filter((t) => t.id !== id));
        }
        toast.success('Registro apaga con éxito');
      } catch (error) {
        toast.error('Error al apagar');
      }
    },
    [transactions]
  );

  const handleSearch = (searchInput) => {
    console.log(searchInput);
    console.log(transactions);
    let foundTransactions = [];
    const { material: searchMaterial } = searchInput;
    const { category } = searchInput;
    if (searchMaterial) {
      foundTransactions = transactions.filter(({ material }) => {
        const currentName = material.name.toLowerCase();
        const newName = searchInput.material.name.toLowerCase();
        return currentName.includes(newName);
      });
    }
    if (category) {
      foundTransactions = transactions.filter(({ material }) => {
        const currentName = material.category.name.toLowerCase();
        const newName = category.name.toLowerCase();
        return currentName.includes(newName);
      });
    }
    timeout = setTimeout(() => setFilteredTransactions(foundTransactions), 350);
  };

  const columns = useMemo(() => {
    const newCol = {
      Header: 'Editar',
      accessor: 'edit',

      width: 10,
      disableResize: true,
      disableSort: true,

      // eslint-disable-next-line react/prop-types
      Cell: ({ row: { original } }) => (
        <TableEditColumn
          original={original}
          onEditClick={handleEdit}
          onDeleteClick={handleDelete}
          userRole={userRole}
          hasDelete
        />
      ),
    };

    const cols = COLUMNS(locale);

    return [...cols, newCol];
  }, [locale, handleDelete, handleEdit, userRole]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Container>
          <div className="title-container">
            <button
              type="button"
              className="back-button"
              onClick={() => history.goBack()}
            >
              <MdKeyboardBackspace />
            </button>

            <h2>Registros Entradas/Salidas</h2>
          </div>
          <TopBar onInputChange={handleSearch} />
          <Content>
            <Table columns={columns} data={filteredTransactions} />
          </Content>
        </Container>
      )}
    </>
  );
}

export default MaterialTransaction;
