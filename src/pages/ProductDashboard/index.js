import React, { useState, useEffect, useCallback } from 'react';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';

import { MdEdit, MdDelete, MdAdd, MdRemove } from 'react-icons/md';

import { uniqueId } from 'lodash';
import ProductModal from '../../components/ProductModal';
import SideBar from '../../components/SideBar';
import Modal from '../../components/Modal';
import Spinner from '../../components/Spinner';
import InsertCategoryModal from '../../components/InsertCategoryModal';

import { Container, Content, TableContainer, ButtonsContainer } from './style';

import api from '../../services/api';
import RemoveCategoryModal from '../../components/RemoveCategoryModal';

export default function ProductDashboard() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filesChanged, setFilesChanged] = useState(false);
  const [categories, setCategories] = useState([]);
  const [currentProdutc, setCurrentProdutc] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalsOpen, setModalsOpen] = useState({
    insertProductModal: false,
    InsertCategoryModal: false,
    ModalOpen: false,
    removeCategoryModal: false,
  });

  const changeTableDisplay = (p, display = 'block') => {
    if (p.target.children.length) {
      for (let i = 0; i < p.target.children.length; i++) {
        if (p.target.children[i].localName === 'table') {
          p.target.children[i].style.display = display;
        }
      }
    }
  };

  const handleModals = useCallback(
    (modalStateName, state) => {
      if (!state) {
        setCurrentProdutc({});
      }
      const newState = { ...modalsOpen };
      newState[modalStateName] = state;
      setModalsOpen(newState);
    },
    [modalsOpen]
  );

  const loadAllProducts = useCallback(async () => {
    setIsLoading(true);
    const res = await api.get('product');
    setProducts(res.data);
    setIsLoading(false);
  }, []);

  const loadAllCategories = useCallback(async () => {
    setIsLoading(true);
    const res = await api.get('categories');
    setCategories(res.data);
    setIsLoading(false);
  }, []);

  const handleAddCategory = async (body) => {
    try {
      handleModals('InsertCategoryModal', false);
      const response = await api.post('category', body);
      const newCategory = response.data;
      const newCategories = [newCategory, ...categories];
      setCategories(newCategories);
      toast.success('Categoria criada com sucesso');
    } catch (err) {
      toast.error('Erro ao criar categoria');
    }
  };

  const handleEditProduct = useCallback(
    (product) => {
      const currentProd = products.find((p) => product.id === p.id);
      setCurrentProdutc(currentProd);
      handleModals('insertProductModal', true);
    },
    [handleModals, products]
  );
  useEffect(() => {
    loadAllProducts();
  }, [filesChanged, loadAllProducts]);

  const deleteFile = async (fileToDelete) => {
    api
      .delete(`/product/${fileToDelete.id}/file`)
      .then(() => setFilesChanged(!filesChanged))
      .catch((err) => {
        throw err;
      });
  };

  const uploadFile = async ({ file: fileToUpload }, productId) => {
    const data = new FormData();
    data.append('file', fileToUpload);
    api
      .post(`/product/${productId}/file`, data)
      .then(() => setFilesChanged(!filesChanged))
      .catch((err) => {
        throw err;
      });
  };

  const handleSubmitProduct = async ({ data: body, files }) => {
    try {
      const { id } = body;
      let res = {};
      if (id) {
        res = await api.put(`product/${id}`, body);
      } else {
        res = await api.post('product', body);
      }
      const newProduct = res.data;

      if (files.length) {
        const toUpload = files.filter((f) => f.isNew && !f.toDelete);

        toUpload.forEach((f) => uploadFile(f, newProduct.id));

        const toDelete = files.filter((f) => f.toDelete && !f.isNew);
        toDelete.forEach(deleteFile);
      }
      const newProducts = products.map((p) =>
        p.id === newProduct.id ? newProduct : p
      );
      setProducts(newProducts);
      loadAllProducts();
      handleModals('insertProductModal', false);
      toast.success(`Produto ${id ? 'atualizado' : 'criado'} com sucesso`);
    } catch (err) {
      toast.error('Erro ao salvar produto');
    }
  };

  const handleDelete = async ({ id }) => {
    try {
      await api.delete(`product/${id}`);
      await loadAllProducts();
      setIsModalOpen(false);
      toast.success('Produto deletado');
    } catch (err) {
      toast.error('Erro ao deletar');
    }
  };

  const handleRemoveCategory = async (data) => {
    try {
      const { id } = categories.find((cat) => cat.name === data.category);
      await api.delete(`/category/${id}`);
      const newCategories = categories.filter((cat) => cat.id !== id);
      setCategories(newCategories);
      handleModals('removeCategoryModal', false);
      toast.success(`Cateria ${data.category} deletada`);
    } catch (error) {
      toast.error('Erro ao deletar categoria');
    }
  };

  useEffect(() => {
    loadAllCategories();
    loadAllProducts();
  }, [loadAllProducts, loadAllCategories]);

  function generateTableRows(category) {
    if (products[0] && categories[0]) {
      const prodsByCat = products.filter((p) => p.category === category);
      const rows = prodsByCat.map((p) => (
        <tr className="row-data" key={uniqueId()}>
          <td>{p.name}</td>
          <td className="row-description">{p.description}</td>
          <td>
            <NumberFormat value={p.price} displayType="text" />
          </td>
          <td>
            <MdEdit onClick={() => handleEditProduct(p)} />
            <MdDelete
              onClick={() => {
                setCurrentProdutc(p);
                setIsModalOpen(true);
              }}
            />
          </td>
        </tr>
      ));
      return <tbody>{rows}</tbody>;
    }
    return null;
  }

  return (
    <>
      <SideBar />
      {isLoading ? (
        <Spinner />
      ) : (
        <Container>
          <Content>
            <ButtonsContainer>
              <button
                type="button"
                style={{ backgroundColor: '#27ae60' }}
                onClick={() => handleModals('InsertCategoryModal', true)}
              >
                <MdAdd />
                <span>Categoria</span>
              </button>
              <button
                type="button"
                style={{ backgroundColor: '#C0392B' }}
                onClick={() => handleModals('removeCategoryModal', true)}
              >
                <MdRemove />
                <span>Categoria</span>
              </button>
              <button
                type="button"
                style={{ backgroundColor: '#27ae60' }}
                onClick={() => {
                  setCurrentProdutc({});
                  handleModals('insertProductModal', true);
                }}
              >
                <MdAdd />
                <span>Produto</span>
              </button>
            </ButtonsContainer>
            {categories.length &&
              categories.map(({ name: cat }) => (
                <TableContainer
                  key={`prodDash-TContainter-${cat}`}
                  onMouseEnter={(p) => changeTableDisplay(p)}
                  onMouseLeave={(p) => changeTableDisplay(p, 'none')}
                >
                  <h1>{cat}</h1>
                  <table>
                    <thead>
                      <tr>
                        <th style={{ width: '35%' }}>Nome</th>
                        <th style={{ width: '45%' }}>Descrição</th>
                        <th style={{ width: '15%' }}>Valor</th>
                        <th style={{ width: '15%' }}>Editar</th>
                      </tr>
                    </thead>
                    {generateTableRows(cat)}
                  </table>
                </TableContainer>
              ))}
          </Content>
        </Container>
      )}

      {modalsOpen.insertProductModal && (
        <ProductModal
          onEscPress={() => handleModals('insertProductModal', false)}
          onCancelPress={() => handleModals('insertProductModal', false)}
          categories={categories}
          products={products.map((p) => ({
            id: p.id,
            name: p.name,
            file: p.file,
          }))}
          onSubmit={handleSubmitProduct}
          initialData={currentProdutc}
          okButtonText={currentProdutc.id ? 'Salvar' : 'Criar'}
        />
      )}

      {modalsOpen.InsertCategoryModal && (
        <InsertCategoryModal
          onEscPress={() => handleModals('InsertCategoryModal', false)}
          onCancelPress={() => handleModals('InsertCategoryModal', false)}
          onSubmit={handleAddCategory}
          categories={categories}
        />
      )}
      {modalsOpen.removeCategoryModal && (
        <RemoveCategoryModal
          onCancelPress={() => handleModals('removeCategoryModal', false)}
          onEscPress={() => handleModals('removeCategoryModal', false)}
          categories={categories}
          products={products.map((p) => ({
            id: p.id,
            name: p.name,
            category: p.category,
          }))}
          onSubmit={handleRemoveCategory}
        />
      )}
      <Modal
        isOpen={isModalOpen}
        onCancelClick={() => setIsModalOpen(false)}
        onOkClick={async () => {
          await handleDelete(currentProdutc);
        }}
        message="Certeza que deseja deletar?"
        onEscPress={() => setIsModalOpen(false)}
      />
    </>
  );
}
