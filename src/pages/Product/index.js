import React, { useCallback, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { MdClose, MdModeEdit } from 'react-icons/md';

import { toast } from 'react-toastify';
import { Container, Content, ProductDetails, ProductText } from './style';

import api from '../../services/api';
import ProductModal from '../../components/ProductModal';
import Spinner from '../../components/Spinner';

const defaultProdUrl =
  'https://images.unsplash.com/photo-1573871924474-04f515cf7399?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';

export default function Product() {
  const [filesChanged, setFilesChanged] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({});
  const [id, setId] = useState('');
  const [editProductModal, setEditProductModal] = useState(false);
  const [userCanEdit, setUserCanEdit] = useState(false);
  const [fileIndex, setFileIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { id: urlId } = useParams();

  useEffect(() => {
    setId(urlId);
  }, [urlId]);

  useEffect(() => {
    setIsLoading(true);
    if (product.name && categories.length && products.length) {
      setIsLoading(false);
    }
  }, [product, categories, products]);

  const loadAllCategories = async () => {
    const res = await api.get('categories');
    setCategories(res.data);
  };

  const loadProduct = useCallback(async () => {
    if (id) {
      const res = await api.get(`/product/${id}`);
      const { data } = res;
      setProduct(data);
    }
  }, [id]);

  const loadAllProducts = async () => {
    const res = await api.get('product');
    setProducts(res.data);
  };

  useEffect(() => {
    const loadUserRole = async () => {
      const res = await api.get('/user');
      if (res.data.role === 'admin' || res.data.role === 'office') {
        setUserCanEdit(true);
      }
    };

    loadUserRole();
    loadProduct();
  }, [id, loadProduct]);

  useEffect(() => {
    loadAllCategories();
    loadAllProducts();
  }, []);

  useEffect(() => {
    loadAllProducts();
  }, [filesChanged]);

  useEffect(() => {
    loadProduct();
  }, [filesChanged, loadProduct]);

  const deleteFile = async (fileToDelete) => {
    api
      .delete(`/product/${fileToDelete.id}/file`)
      .then(() => setFilesChanged(!filesChanged))
      .catch((err) => {
        toast.error(err.message);
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
        toast.error(err.message);
        throw err;
      });
  };

  const handleSubmitProduct = async ({ data: body, files }) => {
    try {
      const { data } = await api.put(`product/${id}`, body);
      if (!data) {
        toast.error('Produto não encontrado');
        return;
      }

      const newProduct = data;

      if (files.length) {
        const toUpload = files.filter((f) => f.isNew && !f.toDelete);

        toUpload.forEach((f) => uploadFile(f, newProduct.id));

        const toDelete = files.filter((f) => f.toDelete && !f.isNew);
        toDelete.forEach(deleteFile);
      }
      setProduct(newProduct);
      setEditProductModal(false);
      toast.success('Produto editado com sucesso');
    } catch (err) {
      toast.error('Erro ao editar produto');
    }
  };

  const productFilePath = () => {
    if (product.file?.length) {
      return product.file[fileIndex].url;
    }
    return defaultProdUrl;
  };

  const handleImgChange = (to = 'next') => {
    if (product.file?.length) {
      let index = fileIndex;
      if (to === 'next') {
        index += 1;
      } else {
        index -= 1;
      }
      if (index < 0) index = product.file.length - 1;
      if (index > product.file.length - 1) index = 0;
      setFileIndex(index);
    }
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Container>
          <Content>
            <div style={{ position: 'relative' }}>
              <button
                className="prev-img"
                type="button"
                onClick={() => handleImgChange('prev')}
              >
                {'<'}
              </button>
              {product.file?.length ? (
                <img src={productFilePath()} alt={product.name} />
              ) : (
                <MdClose style={{ width: '100%', height: 'auto' }} />
              )}

              <button
                className="next-img"
                type="button"
                onClick={handleImgChange}
              >
                {'>'}
              </button>
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
      )}

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
