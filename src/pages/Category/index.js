import React, { useEffect, useMemo, useState } from 'react';

import { MdDelete, MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '../../services/api';

import { Container, Content } from './styles';
import COLUMNS from './Table/columns';

import Spinner from '../../components/Spinner';
import CategoryTable from '../../components/Table';
import SimpleConfirmationModal from '../../components/SimpleConfirmationModal';

import TopBar from './TopBar';
import CategoryModal from './CategoryModal';

import utils from '../../utils';

function Category() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isCatModalOpenOpen, setIsCatModalOpenOpen] = useState(false);

  useEffect(() => {
    const loadAllCategories = async () => {
      const { data } = await api.get('categories');
      if (data) {
        data.sort((a, b) => utils.naturalSortCompare(a.name, b.name));
        setCategories(data);
      }
    };
    loadAllCategories();
  }, []);

  useEffect(() => {
    if (categories) {
      setIsLoading(false);
    }
  }, [categories]);

  const createCategory = (body) => {
    return api.post('category', body);
  };

  const handleCreateCategory = async (body) => {
    try {
      const { data: newCategory } = await createCategory(body);
      if (newCategory) {
        const newCategories = [...categories, newCategory];
        setCategories(
          newCategories.sort((a, b) => utils.naturalSortCompare(a.name, b.name))
        );
        toast.success(`Categoria creada con éxito`);
      }
    } catch (error) {
      toast.error(
        error.response ? error.response.data.message : 'Error al crear'
      );
    }
  };

  const updateCategory = (body) => {
    return api.put(`category/${body.id}`, body);
  };

  const handleUpdateCategory = async (body) => {
    try {
      const { data: updatedCategory } = await updateCategory(body);
      const updatedCategories = categories.map((c) => {
        if (c.id === updatedCategory.id) {
          return updatedCategory;
        }
        return c;
      });
      setCategories(
        updatedCategories.sort((a, b) =>
          utils.naturalSortCompare(a.name, b.name)
        )
      );
      toast.success(`Categoria guardada con éxito`);
    } catch (error) {
      toast.error(
        error.response ? error.response.data.message : 'Error al guardar'
      );
    }
  };

  const handleSubmit = (body) => {
    try {
      if (body.id) {
        handleUpdateCategory(body);
      }
      if (!body.id) {
        handleCreateCategory(body);
      }
    } catch (error) {
      toast.error(`Error al ${body.id ? 'guardar' : 'crear'}`);
    } finally {
      setIsCatModalOpenOpen(false);
    }
  };

  const handleEditClick = (data) => {
    setCurrentCategory(data);
    setIsCatModalOpenOpen(true);
  };

  const deleteCategory = (category) => {
    return api.delete(`category/${category.id}`);
  };

  const handleDeleteCategory = async () => {
    try {
      const { data: affectedRows } = await deleteCategory(currentCategory);

      if (!affectedRows) {
        throw Error('Error al borrar');
      }

      toast.success('Categoria borrada con éxito');
    } catch (error) {
      toast.error(
        error.response ? error.response.data.message : 'Error al borrar'
      );
    } finally {
      setIsConfirmDeleteOpen(false);
    }
  };

  const handleDeleteClick = (data) => {
    setCurrentCategory(data);
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
      <Container>
        <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>
          Categorias
        </h2>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <TopBar
              onNewButton={() => {
                setCurrentCategory({});
                setIsCatModalOpenOpen(true);
              }}
            />
            <Content>
              <CategoryTable data={categories} columns={columns} />
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
      {isCatModalOpenOpen && (
        <CategoryModal
          onCancelClick={() => setIsCatModalOpenOpen(false)}
          onEscPress={() => setIsCatModalOpenOpen(false)}
          initialData={currentCategory}
          onSubmit={handleSubmit}
          categories={categories}
        />
      )}
    </>
  );
}

export default Category;
