import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { MdDelete, MdEdit } from 'react-icons/md';

import { toast } from 'react-toastify';
import SideBar from '../../components/SideBar';
import Table from '../../components/Table';
import Spinner from '../../components/Spinner';

import { Container, Content } from './styles';
import TopBar from './TopBar';
import COLUMNS from './Table/columns';
import ConcreteModal from './ConcreteDesignModal';

import api from '../../services/api';
import utils from '../../utils/index';

function ConcreteDesigns() {
  const { locale } = useSelector((state) => state.locale);
  const [concreteDesigns, setConcreteDesigns] = useState(null);
  const [materials, setMaterials] = useState(null);
  const [currentConcreteDesign, setCurrentConcreteDesign] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConcreteModalOpen, setIsConcreteModalOpen] = useState(false);

  useEffect(() => {
    const loadAllConcreteDesigns = async () => {
      const { data } = await api.get('concreteDesigns');
      if (data) {
        setConcreteDesigns(
          data.sort((a, b) => utils.naturalSortCompare(a.name, b.name))
        );
      }
    };

    const loadAllMaterials = async () => {
      const { data } = await api.get('materials');
      if (data) {
        setMaterials(
          data.sort((a, b) => utils.naturalSortCompare(a.name, b.name))
        );
      }
    };
    loadAllConcreteDesigns();
    loadAllMaterials();
  }, []);

  useEffect(() => {
    if (materials && concreteDesigns) setIsLoading(false);
  }, [materials, concreteDesigns]);

  const handleEditClick = useCallback((data) => {
    setCurrentConcreteDesign(data);
    setIsConcreteModalOpen(true);
  }, []);

  const handleDeleteClick = useCallback(
    async (data) => {
      try {
        const { data: affectedRows } = await api.delete(
          `concreteDesign/${data.id}`
        );
        if (!affectedRows) {
          throw Error();
        }
        setConcreteDesigns(concreteDesigns.filter((c) => c.id !== data.id));
        toast.success('Dosificación apagada con éxito');
      } catch (error) {
        toast.error(error.message);
      }
    },
    [concreteDesigns]
  );

  const createConcreteDesign = (data) => {
    const { name, slump, notes, concreteDesignMaterial } = data;
    const body = {
      name,
      slump,
      notes,
      concreteDesignMaterial: concreteDesignMaterial
        .filter((c) => !c.toDelete)
        .map(({ quantity_per_m3, material }) => ({
          material_id: material.id,
          quantity_per_m3,
        })),
    };

    return api.post(`concreteDesign`, body);
  };

  const handleCreate = async (data) => {
    try {
      const { data: newConcreteDesign } = await createConcreteDesign(data);
      setConcreteDesigns([...concreteDesigns, newConcreteDesign]);
      toast.success('Dosificación creada con éxito');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsConcreteModalOpen(false);
    }
  };

  const deleteConcreteDesignMaterial = (concreteDesignMaterial) => {
    return api.delete(`concreteDesignMaterial/${concreteDesignMaterial.id}`);
  };

  const handleDeleteConcreteDesignMaterial = (concreteDesignMaterial) => {
    const concreteDesignMaterialToDelete = concreteDesignMaterial.filter(
      (c) => c.toDelete
    );
    return Promise.all(
      concreteDesignMaterialToDelete
        .filter((c) => c.toDelete && !c.isNew)
        .map((c) => deleteConcreteDesignMaterial(c))
    );
  };

  const handleConcreteDesignMaterialUpdate = async (concreteDesignMaterial) => {
    try {
      const concreteDesignMaterialtoUpdate = concreteDesignMaterial
        .filter((c) => !!c.id)
        .map(({ id, material, quantity_per_m3 }) => ({
          id,
          quantity_per_m3,
          material_id: material.id,
        }));

      const concreteDesignMaterialtoCreate = concreteDesignMaterial
        .filter((c) => !c.id)
        .map(({ material, quantity_per_m3 }) => ({
          quantity_per_m3,
          material_id: material.id,
          concrete_design_id: currentConcreteDesign.id,
        }));

      const { data: newDesignMaterial } = await api.post(
        'concreteDesignMaterial',
        concreteDesignMaterialtoCreate
      );

      const { data: updatedDesignMaterial } = await api.put(
        `concreteDesignMaterial`,
        concreteDesignMaterialtoUpdate
      );

      return [...newDesignMaterial, ...updatedDesignMaterial];
    } catch (error) {
      return error;
    }
  };

  const handleConcreteDesignUpdate = (concreteDesignUpdate) => {
    const { id, name, notes, slump } = concreteDesignUpdate;
    const body = { name, notes, slump };
    return api.put(`concreteDesign/${id}`, body);
  };

  const handleUpdate = async (data) => {
    try {
      const { concreteDesignMaterial } = data;
      const newConcreteDesigns = concreteDesigns.filter(
        (c) => c.id !== data.id
      );

      await handleDeleteConcreteDesignMaterial(concreteDesignMaterial);

      let newConcreteDesignMaterial = await handleConcreteDesignMaterialUpdate(
        concreteDesignMaterial.filter((c) => !c.toDelete)
      );

      if (newConcreteDesignMaterial instanceof Error) {
        throw newConcreteDesignMaterial;
      }

      newConcreteDesignMaterial = (await handleConcreteDesignUpdate(data)).data;

      setConcreteDesigns([...newConcreteDesigns, newConcreteDesignMaterial]);

      toast.success('Dosificación guardada con éxito');
    } catch (error) {
      toast.error(
        error?.response?.data?.message
          ? error.response.data.message
          : error.message
      );
    } finally {
      setIsConcreteModalOpen(false);
    }
  };

  const handleSubmit = (data) => {
    try {
      if (data.id) {
        handleUpdate(data);
      }
      if (!data.id) {
        handleCreate(data);
      }
    } catch (error) {
      toast.error(error.message);
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
    const formatedCols = COLUMNS(locale);
    return [...formatedCols, newCol];
  }, [handleDeleteClick, handleEditClick, locale]);

  return (
    <>
      <SideBar />
      {isLoading ? (
        <Spinner />
      ) : (
        <Container>
          <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>
            Dosificaciones
          </h2>
          <TopBar
            onNewButton={() => {
              setCurrentConcreteDesign({});
              setIsConcreteModalOpen(true);
            }}
          />
          <Content>
            <Table columns={columns} data={concreteDesigns} />
          </Content>
        </Container>
      )}
      {isConcreteModalOpen && (
        <ConcreteModal
          onEscPress={() => setIsConcreteModalOpen(false)}
          initialData={currentConcreteDesign}
          onCancelButton={() => setIsConcreteModalOpen(false)}
          onSubmit={handleSubmit}
          materials={materials}
          locale={locale}
        />
      )}
    </>
  );
}

export default ConcreteDesigns;
