import React, { useEffect, useMemo, useState } from 'react';

import { MdDelete, MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '../../services/api';

import { Container, Content } from './styles';
import COLUMNS from './Table/columns';

import SideBar from '../../components/SideBar';
import Spinner from '../../components/Spinner';
import MeasureTable from '../../components/Table';
import SimpleConfirmationModal from '../../components/SimpleConfirmationModal';

import TopBar from './TopBar';
import MeasureModal from './MeasurementModal';

import utils from '../../utils';

function Measurements() {
  const [isLoading, setIsLoading] = useState(true);
  const [measurements, setMeasurements] = useState(null);
  const [currentMeasure, setCurrentMeasure] = useState(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isMeasureModalOpenOpen, setIsMeasureModalOpenOpen] = useState(false);

  useEffect(() => {
    const loadAllMeasurements = async () => {
      const { data } = await api.get('measurements');
      if (data) {
        data.sort((b, a) =>
          utils.naturalSortCompare(a.abbreviation, b.abbreviation)
        );
        setMeasurements(data);
      }
    };
    loadAllMeasurements();
  }, []);

  useEffect(() => {
    if (measurements) {
      setIsLoading(false);
    }
  }, [measurements]);

  const createMeasure = (body) => {
    return api.post('measure', body);
  };

  const handleCreateMeasure = async (body) => {
    try {
      const { data: newMeasure } = await createMeasure(body);
      if (newMeasure) {
        const newCategories = [...measurements, newMeasure];
        setMeasurements(
          newCategories.sort((b, a) =>
            utils.naturalSortCompare(a.abbreviation, b.abbreviation)
          )
        );
        toast.success(`Unidad creada con éxito`);
      }
    } catch (error) {
      toast.error(
        error.response ? error.response.data.message : 'Error al crear'
      );
    }
  };

  const updateMeasure = (body) => {
    return api.put(`measure/${body.id}`, body);
  };

  const handleUpdateMeasure = async (body) => {
    try {
      const { data: updatedMeasure } = await updateMeasure(body);
      const updatedMeasurements = measurements.map((c) => {
        if (c.id === updatedMeasure.id) {
          return updatedMeasure;
        }
        return c;
      });
      setMeasurements(
        updatedMeasurements.sort((a, b) => utils.naturalSortCompare(a, b))
      );
      toast.success(`Unidad guardada con éxito`);
    } catch (error) {
      toast.error(
        error.response ? error.response.data.message : 'Error al guardar'
      );
    }
  };

  const handleSubmit = (body) => {
    try {
      if (body.id) {
        handleUpdateMeasure(body);
      }
      if (!body.id) {
        handleCreateMeasure(body);
      }
    } catch (error) {
      toast.error(`Error al ${body.id ? 'guardar' : 'crear'}`);
    } finally {
      setIsMeasureModalOpenOpen(false);
    }
  };

  const handleEditClick = (data) => {
    setCurrentMeasure(data);
    setIsMeasureModalOpenOpen(true);
  };

  const deleteMeasure = (measure) => {
    return api.delete(`measure/${measure.id}`);
  };

  const handleDeleteCategory = async () => {
    try {
      const { data: affectedRows } = await deleteMeasure(currentMeasure);

      if (!affectedRows) {
        throw Error('Error al borrar');
      }

      const newMeasurements = measurements.filter(
        (m) => m.id !== currentMeasure.id
      );

      setMeasurements(newMeasurements);

      toast.success('Unidad borrada con éxito');
    } catch (error) {
      toast.error(
        error.response ? error.response.data.message : 'Error al borrar'
      );
    } finally {
      setIsConfirmDeleteOpen(false);
    }
  };

  const handleDeleteClick = (data) => {
    setCurrentMeasure(data);
    setIsConfirmDeleteOpen(true);
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
          <button
            className="delete-button"
            type="button"
            onClick={() => handleDeleteClick(original)}
          >
            <MdDelete />
          </button>
        </div>
      ),
    };
    return [...COLUMNS, newCol];
  }, []);

  return (
    <>
      <SideBar />
      <Container>
        <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>
          Unidades de Medida
        </h2>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <TopBar
              onNewButton={() => {
                setCurrentMeasure({});
                setIsMeasureModalOpenOpen(true);
              }}
            />
            <Content>
              <MeasureTable data={measurements} columns={columns} />
            </Content>
          </>
        )}
      </Container>
      <SimpleConfirmationModal
        isOpen={isConfirmDeleteOpen}
        onCancelClick={() => setIsConfirmDeleteOpen(false)}
        onEscPress={() => setIsConfirmDeleteOpen(false)}
        onOkClick={handleDeleteCategory}
      />
      {isMeasureModalOpenOpen && (
        <MeasureModal
          onCancelClick={() => setIsMeasureModalOpenOpen(false)}
          onEscPress={() => setIsMeasureModalOpenOpen(false)}
          initialData={currentMeasure}
          onSubmit={handleSubmit}
          measurements={measurements}
        />
      )}
    </>
  );
}

export default Measurements;
