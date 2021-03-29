import React, { useState, useEffect } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import ProductCard from '../ProductCard';
import { Container } from './style';

import api from '../../services/api';

export default function HorizontalScroll() {
  const [products, setProducts] = useState({});

  useEffect(() => {
    async function loadAllProducts() {
      const res = await api.get('product');
      console.log(res.data.map((p) => p.category));
      setProducts(res.data);
    }
    loadAllProducts();
  }, []);

  return (
    <Container>
      <ScrollMenu
        data={
          products[0] &&
          products.map((product) => {
            const { name, id, description } = product;
            return (
              <ProductCard description={description} text={name} key={id} />
            );
          })
        }
      />
    </Container>
  );
}
