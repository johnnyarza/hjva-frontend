import React, { useState, useEffect, useCallback } from 'react';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';

import { MdEdit, MdDelete, MdAdd, MdRemove } from 'react-icons/md';

import ProductModal from '../../components/ProductModal';
import SideBar from '../../components/SideBar';
import Modal from '../../components/Modal';
import InsertCategoryModal from '../../components/InsertCategoryModal';

import { Container, Content, TableContainer, ButtonsContainer } from './style';

import api from '../../services/api';
import RemoveCategoryModal from '../../components/RemoveCategoryModal';

export default function ProductDashboard() {
  const [products, setProducts] = useState([]);
  const [currentProdutc, setCurrentProdutc] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
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
      const newState = { ...modalsOpen };
      newState[modalStateName] = state;
      setModalsOpen(newState);
    },
    [modalsOpen]
  );

  const loadAllProducts = useCallback(async () => {
    const res = await api.get('product');
    setProducts(res.data);
  }, []);

  const loadAllCategories = useCallback(async () => {
    const res = await api.get('categories');
    setCategories(res.data);
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
      setCurrentProdutc(product);
      handleModals('insertProductModal', true);
    },
    [handleModals]
  );

  const handleAddProduct = async (body) => {
    try {
      console.log(body);
      // const res = await api.post('product', body);
      // const newProduct = res.data;
      // const newProducts = [...products];
      // newProducts.push(newProduct);
      // handleModals('insertProductModal', false);
      // setProducts(newProducts);
      toast.success('Produto criado com sucesso');
    } catch (err) {
      toast.error('Erro ao criar produto');
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

  const handleRemoveCategory = useCallback(
    async (data) => {
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
    },
    [categories, handleModals]
  );

  useEffect(() => {
    loadAllCategories();
    loadAllProducts();
  }, [loadAllProducts, loadAllCategories]);

  function generateTableRows(category) {
    if (products[0] && categories[0]) {
      const prodsByCat = products.filter((p) => p.category === category);
      const rows = prodsByCat.map((p) => (
        <tr className="row-data" key={`prodDash-TContainter-trData-${p.id}`}>
          <td>{p.name}</td>
          <td>{p.description}</td>
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

      {modalsOpen.insertProductModal && (
        <ProductModal
          onEscPress={() => handleModals('insertProductModal', false)}
          onCancelPress={() => handleModals('insertProductModal', false)}
          categories={categories}
          products={products.map((p) => ({ id: p.id, name: p.name }))}
          onSubmit={handleAddProduct}
          initialData={currentProdutc}
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
