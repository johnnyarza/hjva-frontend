import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { Container } from './styles';

import Table from '../../components/Table';
import TableEditColumn from '../../components/TableEditColumn';
import TopBar from '../../components/DinTopBar';

import api from '../../services/api';

import COLUMNS from './Table/productTableColumns';
import Spinner from '../../components/Spinner';
import utils from '../../utils';

function ProductDashboard() {
  const { locale } = useSelector((state) => state.locale);
  const [products, setProducts] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState('');
  const [userRole, setUserRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchField, setSearchField] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await api.get('user');
      const { role } = data;
      if (role) setUserRole(role);
    };
    loadUser();
  }, []);

  useEffect(() => {
    const loadAllProducts = async () => {
      const { data } = await api.get('products');
      if (data) {
        const sorted = data.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        console.table(sorted);
        setProducts(sorted);
        setFilteredProducts(sorted);
      }
    };
    loadAllProducts();
    setIsLoading(false);
  }, []);

  const handleCreateProduct = () => {
    console.log('new');
  };

  const handleSearch = useCallback(() => {
    let filtered = products;
    if (searchField) {
      const entries = Object.entries(searchField);
      const [field, value] = entries[0];

      filtered = products.filter((provider) => {
        const valueToCompare = provider[field];
        if (!valueToCompare) return false;
        if (field === 'updatedAt') {
          const { from, to } = value;
          if (from && to) {
            return utils.isBetweenDates(from, to, valueToCompare);
          }
          return true;
        }

        return valueToCompare.toLowerCase().includes(value.toLowerCase());
      });
    }

    setFilteredProducts(filtered);
  }, [searchField, products]);

  useEffect(() => {
    if (searchField) handleSearch();
  }, [handleSearch, products, searchField]);

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
          <TableEditColumn
            userRole={userRole}
            original={original}
            hasEdit
            hasDelete
            onEditClick={() => {
              setCurrentProduct(original);
            }}
            onDeleteClick={() => console.log(original)}
          />
        </div>
      ),
    };
    const formatedCols = COLUMNS(locale);
    return [...formatedCols, newCol];
  }, [userRole, locale]);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Container>
          <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>
            Dosificaciones
          </h2>
          <TopBar
            buttons={[{ label: 'Crear', onClick: handleCreateProduct }]}
            onCleanSearchButton={() => setFilteredProducts(products)}
            onSearchInputChange={(data) => setSearchField(data)}
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
            ]}
          />
          <Table data={filteredProducts} columns={columns} />
        </Container>
      )}
    </>
  );
}

export default ProductDashboard;
