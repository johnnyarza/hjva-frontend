import React, { useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';

import { MdEdit, MdDelete, MdAdd, MdRemove } from 'react-icons/md';

import InsertProductModal from '../../components/InsertProductModal';
import SideBar from '../../components/SideBar';
import Modal from '../../components/Modal';
import InsertCategoryModal from '../../components/InsertCategoryModal';

import { Container, Content, TableContainer, ButtonsContainer } from './style';

import api from '../../services/api';

export default function ProductDashboard() {
  const [products, setProducts] = useState([]);
  const [currentProdutc, setCurrentProdutc] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInsertCategoryModalOpen, setIsInsertCategoryModalOpen] = useState(
    false
  );
  const [isInsertpProductModalOpen, setIsInsertProductModalOpen] = useState(
    false
  );
  const [categories, setCategories] = useState([]);

  const changeTableDisplay = (p, display = 'block') => {
    if (p.target.children.length) {
      for (let i = 0; i < p.target.children.length; i++) {
        if (p.target.children[i].localName === 'table') {
          p.target.children[i].style.display = display;
        }
      }
    }
  };

  async function loadAllProducts() {
    const res = await api.get('product');
    console.log(res.data);
    setProducts(res.data);
  }

  async function loadAllCategories() {
    const res = await api.get('categories');
    setCategories(res.data);
  }

  const handleAddCategory = async (body) => {
    try {
      setIsInsertCategoryModalOpen(false);
      const response = await api.post('category', body);
      const newCategory = response.data;
      const newCategories = [newCategory, ...categories];
      setCategories(newCategories);
      toast.success('Categoria criada com sucesso');
    } catch (err) {
      toast.error('Erro ao criar categoria');
    }
  };

  const handleAddProduct = async (body) => {
    try {
      const res = await api.post('product', body);
      const newProduct = res.data;
      const newProducts = [...products];
      newProducts.push(newProduct);
      setIsInsertProductModalOpen(false);
      setProducts(newProducts);
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

  useEffect(() => {
    loadAllCategories();
    loadAllProducts();
  }, []);

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
            <MdEdit />
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
              onClick={() => setIsInsertCategoryModalOpen(true)}
            >
              <MdAdd />
              <span>Categoria</span>
            </button>
            <button
              type="button"
              style={{ backgroundColor: '#C0392B' }}
              onClick={() => console.log('deletar cat')}
            >
              <MdRemove />
              <span>Categoria</span>
            </button>
            <button
              type="button"
              style={{ backgroundColor: '#27ae60' }}
              onClick={() => setIsInsertProductModalOpen(true)}
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

      {isInsertpProductModalOpen && (
        <InsertProductModal
          onEscPress={() => setIsInsertProductModalOpen(false)}
          onCancelPress={() => setIsInsertProductModalOpen(false)}
          categories={categories}
          products={products.map((p) => ({ id: p.id, name: p.name }))}
          onSubmit={handleAddProduct}
        />
      )}

      {isInsertCategoryModalOpen && (
        <InsertCategoryModal
          onEscPress={() => setIsInsertCategoryModalOpen(false)}
          onCancelPress={() => setIsInsertCategoryModalOpen(false)}
          onSubmit={handleAddCategory}
          categories={categories}
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

/* <GenericModal
        isOpen={isGenericModalOpen}
        onEscPress={() => setIsGenericModalOpen(false)}
      >
        <form onSubmit={handleAddCategory}>
          <span>Criar nova categoria de produto</span>
          <input
            type="text"
            name="categoryName"
            placeholder="Nome da Categoria"
          />
          <button
            type="submit"
            style={{ marginTop: '15px', backgroundColor: '#27ae60' }}
          >
            Criar
          </button>
          <div>
            <button
              style={{ marginTop: '15px', backgroundColor: '#c0392b' }}
              type="button"
              onClick={() => setIsGenericModalOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </form>
      </GenericModal> */
