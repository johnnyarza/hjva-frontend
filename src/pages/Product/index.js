import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { MdModeEdit } from 'react-icons/md';

import { toast } from 'react-toastify';
import { Container, Content, ProductDetails, ProductText } from './style';

import api from '../../services/api';
import ProductModal from '../../components/ProductModal';

export default function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({});
  const [id, setId] = useState('');
  const [editProductModal, setEditProductModal] = useState(false);
  const [userCanEdit, setUserCanEdit] = useState(false);
  const { id: urlId } = useParams();

  useEffect(() => {
    setId(urlId);
  }, [urlId]);

  useEffect(() => {
    const loadProduct = async () => {
      const res = await api.get(`/product/${id}`);
      const { data } = res;
      setProduct(data);
    };

    const loadUserRole = async () => {
      const res = await api.get('/user');
      if (res.data.role === 'admin' || res.data.role === 'office') {
        setUserCanEdit(true);
      }
    };

    const loadAllProducts = async () => {
      const res = await api.get('product');
      setProducts(res.data);
    };

    const loadAllCategories = async () => {
      const res = await api.get('categories');
      setCategories(res.data);
    };

    loadUserRole();
    loadProduct();
    loadAllProducts();
    loadAllCategories();
  }, [id]);

  const handleSubmitProduct = async (body) => {
    try {
      const { data } = await api.put(`product/${id}`, body);
      if (!data) {
        toast.error('Produto não encontrado');
        return;
      }
      const newProduct = data;
      const newProducts = products.filter((p) => p.id !== newProduct.id);
      newProducts.push(newProduct);
      setProduct(newProduct);
      setProducts(newProducts);
      setEditProductModal(false);
      toast.success('Produto editado com sucesso');
    } catch (err) {
      toast.error('Erro ao editar produto');
    }
  };

  return (
    <>
      <Container>
        <Content>
          <div>
            <img
              src="https://images.unsplash.com/photo-1573871924474-04f515cf7399?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
              alt={product.name}
            />
          </div>

          <ProductDetails>
            <div className="product-name">
              <h1>{product.name}</h1>
            </div>
            <div className="product-details">
              <pre>{product.description} </pre>
            </div>
            {userCanEdit && (
              <ProductText className="product-price">
                <h2>$ {product.price}</h2>
              </ProductText>
            )}
          </ProductDetails>
          {userCanEdit && (
            <button
              type="button"
              className="edit-icon"
              onClick={() => setEditProductModal(true)}
            >
              <MdModeEdit />
            </button>
          )}
        </Content>
      </Container>
      {editProductModal && (
        <ProductModal
          onEscPress={() => setEditProductModal(false)}
          onCancelPress={() => setEditProductModal(false)}
          categories={categories}
          products={products.map((p) => ({ id: p.id, name: p.name }))}
          onSubmit={handleSubmitProduct}
          initialData={product}
          title="Editar Produto"
          okButtonText="Salvar"
        />
      )}
    </>
  );
}
