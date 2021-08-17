import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { MdContentCopy, MdKeyboardBackspace } from 'react-icons/md';
import { toast } from 'react-toastify';
import { startOfDay } from 'date-fns';
import { useSelector } from 'react-redux';
import PropType from 'prop-types';

import { Link, useParams } from 'react-router-dom';
import {
  ControlledMenu,
  MenuButton,
  MenuDivider,
  MenuHeader,
  MenuItem,
} from '@szhsin/react-menu';
import { FaPrint } from 'react-icons/fa';
import Spinner from '../../../components/Spinner';
import Table from '../../../components/Table';
import Empty from '../../../components/Empty';

import { Container, Content, ConcreteSampleContainer } from './styles';
import ConcreteSampleTable from './ConcreteSampleTable/index';
import ConcreteSampleModal from './ConcreteSampleModal';
import TopBar from '../../../components/DinTopBar';

import api from '../../../services/api';

import CONCRETESAMPLECOLUMNS from './ConcreteSampleTable/columns';
import COMPRESSIONTESTCOLUMNS from '../Table/columns';
import utils from '../../../utils';
import TableEditColumn from '../../../components/TableEditColumn';

function ConcreteSample() {
  const { locale } = useSelector((state) => state.locale);
  const ref = useRef(null);
  const [printConcreteDesign, setPrintConcreteDesign] = useState(true);
  const [isPrintMenuOpen, setIsPrintMenuOpen] = useState(false);
  const [printUrl, setPrintUrl] = useState(
    'http://localhost:3333/report/conpressionTest'
  );
  const [isLoading, setIsLoading] = useState(true);
  const [searchField, setSearchField] = useState('');
  const [userRole, setUserRole] = useState('');
  const [compressionTest, setCompressionTest] = useState('');
  const [isConcreteSampleModalOpen, setIsConcreteSampleModalOpen] = useState(
    false
  );
  const [concreteSamples, setConcreteSamples] = useState('');
  const [filteredConcreteSamples, setFilteredConcreteSamples] = useState([]);
  const [currentConcreteSample, setCurrentConcreteSample] = useState({});
  const { id: urlId } = useParams();

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await api.get('user');
      const { role } = data;
      if (role) setUserRole(role);
    };
    loadUser();
  }, []);

  useEffect(() => {
    const loadCompressionTest = async () => {
      if (urlId) {
        const { data } = await api.get('compressionTests', null, {
          params: { urlId },
        });
        if (data) {
          setCompressionTest(data[0]);
        }
      }
    };
    loadCompressionTest();
  }, [urlId]);

  useEffect(() => {
    const loadAllConcreteSamples = async () => {
      const { data } = await api.get(
        `concreteSamples/?compressionTestId=${urlId}`
      );
      if (data) {
        data.forEach((c) => {
          const { sampledAt, loadedAt } = c;
          c.sampledAt = new Date(sampledAt);
          c.loadedAt = new Date(loadedAt);
        });
      }

      setConcreteSamples(data);
    };
    loadAllConcreteSamples();
  }, [compressionTest, urlId]);

  useEffect(() => {
    if (concreteSamples) {
      if (!searchField) setFilteredConcreteSamples(concreteSamples);
    }
  }, [concreteSamples, searchField]);

  useEffect(() => {
    if (concreteSamples) setIsLoading(false);
  }, [concreteSamples]);

  const handleDeleteConcreteSample = useCallback(
    async (concreteSample) => {
      try {
        const { data: affectedRows } = await api.delete(
          `concreteSample/${concreteSample.id}`
        );

        if (affectedRows) {
          setConcreteSamples(
            concreteSamples.filter((c) => c.id !== concreteSample.id)
          );
          toast.success('Probeta apagada');
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    [concreteSamples]
  );

  const updateConcreteSample = async (concreteSample) => {
    try {
      const { concreteDesign } = compressionTest;
      const body = {
        ...concreteSample,
        compressionTestId: compressionTest.id,
        concreteDesignId: concreteDesign.id,
      };

      delete body.compressionTest;

      const { data: newConcreteSample } = await api.put(
        `concreteSample/${concreteSample.id}`,
        utils.clean(body)
      );

      newConcreteSample.sampledAt = startOfDay(
        new Date(newConcreteSample.sampledAt)
      );
      newConcreteSample.loadedAt = startOfDay(
        new Date(newConcreteSample.loadedAt)
      );

      setConcreteSamples(
        concreteSamples
          .map((c) => {
            if (c.id === newConcreteSample.id) {
              return newConcreteSample;
            }
            return c;
          })
          .sort((a, b) => {
            if (a.tracker > b.tracker) return 1;
            if (a.tracker < b.tracker) return -1;
            return 0;
          })
      );

      toast.success('Probeta Guardada con éxito');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleStoreConcreteSample = useCallback(
    async (concreteSample) => {
      try {
        const { id: compressionTestId } = compressionTest;
        const { concreteDesign } = compressionTest;

        const body = {
          compressionTestId,
          concreteDesignId: concreteDesign.id,
          concreteSamples: [concreteSample],
        };

        const { data } = await api.post('concreteSample', body);
        if (data) {
          data.forEach((c) => {
            const { sampledAt, loadedAt } = c;
            c.sampledAt = new Date(sampledAt);
            c.loadedAt = new Date(loadedAt);
          });
          setConcreteSamples(
            [...concreteSamples, ...data].sort((a, b) => {
              if (a.tracker > b.tracker) return 1;
              if (a.tracker < b.tracker) return -1;
              return 0;
            })
          );
        }
        toast.success('Probeta Guardada con éxito');
      } catch (error) {
        toast.error(error.message);
      }
    },
    [compressionTest, concreteSamples]
  );

  const handleCopy = useCallback(
    (original) => {
      try {
        const concreteSample = { ...original };

        delete concreteSample.id;
        delete concreteSample.tracker;
        delete concreteSample.compressionTest;
        delete concreteSample.days;

        handleStoreConcreteSample(concreteSample);
      } catch (error) {
        toast.error(error.message);
      }
    },
    [handleStoreConcreteSample]
  );

  const handleSubmit = (data) => {
    try {
      const { id } = data;
      if (id) {
        updateConcreteSample(data);
      }
      if (!id) {
        handleStoreConcreteSample(data);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsConcreteSampleModalOpen(false);
    }
  };

  const concreteSampleColumns = useMemo(() => {
    const newCol = {
      Header: 'Editar',
      accessor: 'edit',

      width: 25,
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
              type="button"
              className="edit-button"
              onClick={() => handleCopy(original)}
            >
              <MdContentCopy />
            </button>
            <TableEditColumn
              userRole={userRole}
              original={original}
              hasEdit
              hasDelete
              onEditClick={() => {
                setCurrentConcreteSample(original);
                setIsConcreteSampleModalOpen(true);
              }}
              onDeleteClick={handleDeleteConcreteSample}
            />
          </div>
        );
      },
    };
    const cols = CONCRETESAMPLECOLUMNS(locale);
    return [...cols, newCol];
  }, [handleDeleteConcreteSample, locale, handleCopy, userRole]);

  const columns = useCallback(COMPRESSIONTESTCOLUMNS, []);

  const handleSearch = useCallback(() => {
    let filtered = concreteSamples;

    if (searchField) {
      const entries = Object.entries(searchField);
      const [field, value] = entries[0];

      if (value) {
        filtered = concreteSamples.filter((comp) => {
          const newValue = { ...comp };

          const valueToCompare = newValue[field];

          if (!valueToCompare) return false;
          if (
            field === 'updatedAt' ||
            field === 'updated_at' ||
            field === 'loadedAt' ||
            field === 'sampledAt'
          ) {
            const { from, to } = value;
            if (from && to) {
              return utils.isBetweenDates(from, to, valueToCompare);
            }
            return true;
          }

          if (!Number.isNaN(value)) {
            return Number(value) === Number(valueToCompare);
          }

          return String(valueToCompare)
            .toLowerCase()
            .includes(value.toLowerCase());
        });
      }
      setTimeout(() => setFilteredConcreteSamples(filtered), 350);
    }
  }, [concreteSamples, searchField]);

  useEffect(() => {
    handleSearch(searchField);
  }, [searchField, handleSearch, concreteSamples]);

  useEffect(() => {
    utils.managePrintURL(
      `concreteSample${`?compressionTest=${urlId}&printConcreteDesign=${printConcreteDesign}`}`,
      searchField,
      [printUrl, setPrintUrl],
      locale
    );
  }, [searchField, printUrl, printConcreteDesign, locale, urlId]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Container>
          <div className="title-container">
            <Link to="/compresionTest/home">
              <MdKeyboardBackspace />
            </Link>

            <h2>Probetas</h2>
          </div>
          <TopBar
            onSearchInputChange={(data) => setSearchField(data)}
            onCleanSearchButton={() => {
              setFilteredConcreteSamples(concreteSamples);
            }}
            buttons={[
              {
                label: 'Crear',
                onClick: () => {
                  setCurrentConcreteSample('');
                  setIsConcreteSampleModalOpen(true);
                },
              },
            ]}
            fields={[
              {
                field: 'tracker',
                label: 'Prob. Nª',
                inputProps: { type: 'number' },
              },
              {
                field: 'slump',
                label: 'Slump',
                inputProps: { type: 'number' },
              },
              {
                field: 'sampledAt',
                label: 'Moldeo',
                inputProps: { type: 'date' },
              },
              {
                field: 'loadedAt',
                label: 'Rotura',
                inputProps: { type: 'date' },
              },
              {
                field: 'days',
                label: 'Días',
                inputProps: { type: 'number', min: '0' },
              },
              {
                field: 'diameter',
                label: 'Diametro',
                inputProps: { type: 'number' },
              },
              {
                field: 'height',
                label: 'Altura',
                inputProps: { type: 'number' },
              },
              {
                field: 'weight',
                label: 'Peso',
                inputProps: { type: 'number' },
              },
              {
                field: 'load',
                label: 'Rotura (Ton)',
                inputProps: { type: 'number' },
              },
              {
                field: 'mPa',
                label: 'Rotura (MPa)',
                inputProps: { type: 'number' },
              },
            ]}
          >
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
            {compressionTest && (
              <Table
                showWarning={false}
                columns={columns(locale)}
                data={[compressionTest]}
              />
            )}

            <ConcreteSampleContainer>
              {!filteredConcreteSamples.length ? (
                <Empty />
              ) : (
                <ConcreteSampleTable
                  columns={concreteSampleColumns}
                  data={filteredConcreteSamples}
                />
              )}
            </ConcreteSampleContainer>
          </Content>
          {isConcreteSampleModalOpen && (
            <ConcreteSampleModal
              onEscPress={() => setIsConcreteSampleModalOpen(false)}
              onCancelPress={() => setIsConcreteSampleModalOpen(false)}
              initalData={currentConcreteSample}
              onSubmit={handleSubmit}
              locale={locale}
            />
          )}
        </Container>
      )}
    </>
  );
}

ConcreteSample.propTypes = {
  compressionTest: PropType.shape({
    id: PropType.string,
    concreteDesign: PropType.shape({ id: PropType.string }),
  }),
};

ConcreteSample.defaultProps = {
  compressionTest: {},
};

export default ConcreteSample;
