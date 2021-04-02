import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import { MdModeEdit } from 'react-icons/md';

import { Container, Content, ProductDetails } from './style';

import api from '../../services/api';

export default function Product() {
  const { token } = useSelector((state) => state.auth);
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const loadProduct = async () => {
      const res = await api.get(`/product/${id}`);
      const { data } = res;
      setProduct(data);
    };
    loadProduct();
  }, []);

  return (
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
            <p>{product.description}</p>
          </div>
        </ProductDetails>
        {token && (
          <div className="edit-icon">
            <MdModeEdit />
          </div>
        )}
      </Content>
    </Container>
  );
}
