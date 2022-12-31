import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ControlledMenu,
  Menu,
  MenuButton,
  MenuDivider,
  MenuHeader,
  MenuItem,
} from '@szhsin/react-menu';
import { useHistory, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdEdit, MdVisibility } from 'react-icons/md';
import { toast } from 'react-toastify';

import { FaPrint } from 'react-icons/fa';
import CompressionTestsTable from '../../../components/Table';
import DeleteButton from '../../../components/DeleteButton';
import TopBar from '../../../components/DinTopBar';

import COLUMNS from '../Table/columns';

import { Container, Content } from './style';

import Spinner from '../../../components/Spinner';
import CompresionTestModal from '../CompresionTestModal';
import utils from '../../../utils';
import api from '../../../services/api';
import Empty from '../../../components/Empty';

function CompresionTest() {
  const history = useHistory();
  const ref = useRef(null);
  const [printConcreteDesign, setPrintConcreteDesign] = useState(true);
  const [isPrintMenuOpen, setIsPrintMenuOpen] = useState(false);
  const [printUrl, setPrintUrl] = useState(
    'http://localhost:3333/report/conpressionTest'
  );
  const [searchField, setSearchField] = useState('');
  const { locale } = useSelector((state) => state.locale);
  const [compressionTests, setCompressionTests] = useState('');
  const [filteredCompressionTests, setFilteredCompressionTests] = useState([]);
  const [concreteDesigns, setConcreteDesigns] = useState(null);
  const [currentCompressionTest, setCurrentCompressionTest] = useState('');
  const [clients, setClients] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompresionTestModalOpen, setIsCompresionTestModalOpen] =
    useState(false);

  useEffect(() => {
    if (!searchField) setFilteredCompressionTests(compressionTests);
  }, [compressionTests, searchField]);

  useEffect(() => {
    const loadAllCompressionTests = async () => {
      const { data } = await api.get('compressionTests');
      setCompressionTests(data || []);
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
    let filtered = compressionTests;

    if (searchField) {
      const entries = Object.entries(searchField);
      const [field, value] = entries[0];

      if (value) {
        filtered = compressionTests.filter((comp) => {
          const newValue = { ...comp };

          newValue.client = newValue.client.name;
          newValue.concreteProvider = newValue.concreteProvider.name;
          newValue.concreteDesign = newValue.concreteDesign.name;

          const valueToCompare = newValue[field];

          if (!valueToCompare) return false;
          if (field === 'updatedAt' || field === 'updated_at') {
            const { from, to } = value;
            if (from && to) {
              return utils.isBetweenDates(from, to, valueToCompare);
            }
            return true;
          }

          return String(valueToCompare)
            .toLowerCase()
            .includes(value.toLowerCase());
        });
      }
      setTimeout(() => setFilteredCompressionTests(filtered), 350);
    }
  }, [compressionTests, searchField]);

  useEffect(() => {
    handleSearch();
  }, [searchField, handleSearch, compressionTests]);

  useEffect(() => {
    utils.managePrintURL(
      `compressionTest${`?printConcreteDesign=${printConcreteDesign}`}`,
      searchField,
      [printUrl, setPrintUrl],
      locale
    );
  }, [searchField, printUrl, printConcreteDesign, locale]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Container>
          <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>Ensayos</h2>
          <TopBar
            onSearchInputChange={(data) => setSearchField(data)}
            onCleanSearchButton={() => {
              setSearchField('');
              setFilteredCompressionTests(compressionTests);
            }}
            buttons={[
              {
                label: 'Crear',
                onClick: () => {
                  setCurrentCompressionTest({});
                  setIsCompresionTestModalOpen(true);
                },
              },
            ]}
            fields={[
              {
                field: 'tracker',
                label: 'Doc. Nª',
                inputProps: { type: 'number' },
              },
              {
                field: 'client',
                label: 'Cliente',
                inputProps: { type: 'text' },
              },
              {
                field: 'concreteProvider',
                label: 'Prov. Hormigón',
                inputProps: { type: 'text' },
              },
              {
                field: 'concreteDesign',
                label: 'Dosificación',
                inputProps: { type: 'text' },
              },
              {
                field: 'updatedAt',
                label: 'Actualizado',
                inputProps: { type: 'date' },
              },
            ]}
          >
            <Menu
              menuButton={<MenuButton>Registro</MenuButton>}
              arrow
              direction="bottom"
              viewScroll="initial"
            >
              <MenuItem>
                <Link to="/clients" style={{ color: 'black' }}>
                  Clientes
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/providers" style={{ color: 'black' }}>
                  Proveedores
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/measurements" style={{ color: 'black' }}>
                  Unidades de Medida
                </Link>
              </MenuItem>
            </Menu>
            <MenuButton
              ref={ref}
              onClick={() => setIsPrintMenuOpen(!isPrintMenuOpen)}
            >
              <FaPrint />
            </MenuButton>
            <ControlledMenu
              anchorRef={ref}
              isOpen={isPrintMenuOpen}
              arrow
              direction="bottom"
              viewScroll="initial"
              onMouseLeave={() => setIsPrintMenuOpen(false)}
            >
              <MenuItem>
                <a
                  href={printUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() => setIsPrintMenuOpen(false)}
                  style={{ width: '100%' }}
                >
                  Imprimir
                </a>
              </MenuItem>
              <MenuDivider />
              <MenuHeader>Opciones</MenuHeader>
              <MenuItem
                type="checkbox"
                checked={printConcreteDesign}
                onClick={() => setPrintConcreteDesign(!printConcreteDesign)}
              >
                Mostrar Dosificación
              </MenuItem>
            </ControlledMenu>
          </TopBar>
          <Content>
            {!filteredCompressionTests.length ? (
              <Empty />
            ) : (
              <CompressionTestsTable
                columns={columns}
                data={filteredCompressionTests}
                showWarning
              />
            )}
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
