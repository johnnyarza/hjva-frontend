import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../services/api';

import { Container, Content } from './styles';
import COLUMNS from './Table/productTableColumns';

import Table from '../../components/Table';
import TopBar from '../../components/DinTopBar';
import Spinner from '../../components/Spinner';
import EditColumn from '../../components/TableEditColumn';

function ProductDashboard() {
  // TODO terminar
  const { locale } = useSelector((state) => state.locale);
  const [userRole, setUserRole] = useState('common');
  const [isLoading, setIsLoading] = useState(true);
  const [materials, setMaterials] = useState('');
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [currentMaterial, setCurrentMaterial] = useState(null);

  useEffect(() => {
    const loadUserRole = async () => {
      const { data } = await api.get('user');
      if (data) {
        const { role } = data;
        if (role) setUserRole(role);
      }
    };
    loadUserRole();
  }, []);

  useEffect(() => {
    const getAllMaterialsToSell = async () => {
      const { data } = await api.get('materialsToSell');
      if (data) {
        setMaterials(data);
      }
    };
    getAllMaterialsToSell();
  }, []);

  useEffect(() => {
    if (materials) {
      setFilteredMaterials(materials);
    }
    setIsLoading(false);
  }, [materials]);

  const columns = useMemo(() => {
    const newCol = {
      Header: 'Editar',
      accessor: 'edit',

      width: 25,
      disableResize: true,
      disableSort: true,

      // eslint-disable-next-line react/prop-types
      Cell: ({ row: { original } }) => (
        <div
          className="edit-buttons-container"
          style={{ justifyContent: 'center' }}
        >
          <EditColumn hasDelete hasEdit userRole={userRole} />
        </div>
      ),
    };

    const cols = COLUMNS(locale);
    return [...cols, newCol];
  }, [locale, userRole]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Container>
          <TopBar
            onSearchInputChange={(data) => setSearchField(data)}
            onCleanSearchButton={() => setFilteredMaterials(materials)}
            fields={[
              {
                field: 'name',
                label: 'Nombre',
                inputProps: { type: 'text' },
              },
              {
                field: 'category',
                label: 'Categoria',
                inputProps: { type: 'text' },
              },
              {
                field: 'provider',
                label: 'Proveedor',
                inputProps: { type: 'text' },
              },
              {
                field: 'measurement',
                label: 'Unidad',
                inputProps: { type: 'text' },
              },
              {
                field: 'updated_at',
                label: 'Actualizado',
                inputProps: { type: 'date' },
              },
            ]}
            buttons={[
              {
                label: 'Crear',
                onClick: () => console.log('crear'),
              },
            ]}
          />
          <Content>
            <Table columns={columns} data={filteredMaterials || []} />
          </Content>
        </Container>
      )}
    </>
  );
}

export default ProductDashboard;
