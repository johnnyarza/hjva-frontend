import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { MdKeyboardBackspace } from 'react-icons/md';
import { Link, useHistory } from 'react-router-dom';

import SideBar from '../../../components/SideBar';
import Spinner from '../../../components/Spinner';
import Table from '../../../components/Table';

import { Container, Content } from './styles';
import COLUMNS from './columns';
import api from '../../../services/api';

function MaterialTransaction() {
  const history = useHistory();
  const { locale } = useSelector((state) => state.locale);
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    const loadAllTransactions = async () => {
      const { data } = await api.get('materialTransactions');
      setTransactions(data || []);
    };
    loadAllTransactions();
  }, []);

  useEffect(() => {
    if (transactions) setIsLoading(false);
  }, [transactions]);

  const columns = useMemo(() => {
    const cols = COLUMNS(locale);
    return cols;
  }, [locale]);

  return (
    <>
      <SideBar />

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

            <h2>Probetas</h2>
          </div>
          <Content>
            <Table columns={columns} data={transactions} />
          </Content>
        </Container>
      )}
    </>
  );
}

export default MaterialTransaction;
