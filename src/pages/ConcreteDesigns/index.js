import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Table from '../../components/Table';
import Spinner from '../../components/Spinner';
import ColumnEdit from '../../components/TableEditColumn';

import { Container, Content } from './styles';
import TopBar from './TopBar';
import COLUMNS from './Table/columns';
import ConcreteModal from './ConcreteDesignModal';

import api from '../../services/api';
import utils from '../../utils/index';
import Empty from '../../components/Empty';
import PrintMenuButton from '../../components/PrintMenuButton';
import MaterialsToConcreteDesigns from './MaterialsToConcreteDesigns';

function ConcreteDesigns() {
  const { locale } = useSelector((state) => state.locale);
  const [printUrl, setPrintUrl] = useState(
    'http://localhost:3333/report/concreteDesign'
  );
  const [userRole, setUserRole] = useState('');
  const [concreteDesigns, setConcreteDesigns] = useState('');
  const [filteredConcreteDesigns, setFilteredConcreteDesigns] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [materials, setMaterials] = useState(null);
  const [currentConcreteDesign, setCurrentConcreteDesign] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConcreteModalOpen, setIsConcreteModalOpen] = useState(false);
  const [isMatsToConcDesOpen, setIsMatsToConcDesOpen] = useState(false);

  useEffect(() => {
    if (!searchInput && concreteDesigns)
      setFilteredConcreteDesigns(
        concreteDesigns.sort((a, b) => utils.naturalSortCompare(a.name, b.name))
      );
  }, [searchInput, concreteDesigns]);

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
        // eslint-disable-next-line camelcase
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
        // eslint-disable-next-line camelcase
        .map(({ id, material, quantity_per_m3 }) => ({
          id,
          quantity_per_m3,
          material_id: material.id,
        }));

      const concreteDesignMaterialtoCreate = concreteDesignMaterial
        .filter((c) => !c.id)
        // eslint-disable-next-line camelcase
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

  useEffect(() => {
    const loadUserRole = async () => {
      const { data } = await api.get('/user');
      if (data) {
        const { role } = data;
        setUserRole(role);
      }
    };
    loadUserRole();
  }, []);

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
          <ColumnEdit
            original={original}
            hasDelete
            hasEdit
            onDeleteClick={handleDeleteClick}
            onEditClick={handleEditClick}
            userRole={userRole}
          />
        </div>
      ),
    };
    const formatedCols = COLUMNS(locale);
    return [...formatedCols, newCol];
  }, [handleDeleteClick, handleEditClick, locale, userRole]);

  const handleSearch = useCallback(() => {
    let foundCompressionTests = concreteDesigns;
    const { slump, name, notes, updatedAt } = searchInput;

    if (notes) {
      foundCompressionTests = concreteDesigns.filter((current) => {
        if (!current.notes) return false;
        const currentName = current.notes.toLowerCase();
        const newName = notes.toLowerCase();
        return currentName.includes(newName);
      });
    }

    if (name) {
      foundCompressionTests = concreteDesigns.filter((current) => {
        if (!current.name) return false;
        const currentName = current.name.toLowerCase();
        const newName = name.toLowerCase();
        return currentName.includes(newName);
      });
    }

    if (slump && slump > 0) {
      foundCompressionTests = concreteDesigns.filter(
        ({ slump: currentSlump }) => {
          if (!currentSlump) return false;
          const currentName = Number(currentSlump);
          const newName = Number(slump);
          return currentName === newName;
        }
      );
    }

    if (updatedAt) {
      const { from, to } = updatedAt;
      if (from && to) {
        foundCompressionTests = concreteDesigns.filter(
          ({ updatedAt: date }) => {
            return utils.isBetweenDates(from, to, date);
          }
        );
      }
    }
    setTimeout(() => setFilteredConcreteDesigns(foundCompressionTests), 350);
  }, [concreteDesigns, searchInput]);

  useEffect(() => {
    if (searchInput) handleSearch(searchInput);
  }, [searchInput, handleSearch]);

  useEffect(() => {
    utils.managePrintURL(
      'concreteDesign',
      searchInput,
      [printUrl, setPrintUrl],
      locale
    );
  }, [searchInput, printUrl, locale]);

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
            onNewButton={() => {
              setCurrentConcreteDesign({});
              setIsConcreteModalOpen(true);
            }}
            onMatsToConcDesButton={() => setIsMatsToConcDesOpen(true)}
            onInputChange={(data) => setSearchInput(data)}
            onCleanButton={() => {
              setSearchInput('');
              setFilteredConcreteDesigns(concreteDesigns);
            }}
          >
            <PrintMenuButton url={printUrl} />
          </TopBar>
          <Content>
            {!filteredConcreteDesigns.length ? (
              <Empty />
            ) : (
              <Table columns={columns} data={filteredConcreteDesigns} />
            )}
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
      {isMatsToConcDesOpen && (
        <MaterialsToConcreteDesigns
          onCancelButton={() => setIsMatsToConcDesOpen(false)}
        />
      )}
    </>
  );
}

export default ConcreteDesigns;
