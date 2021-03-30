/* eslint-disable */
import React, { useState, useEffect } from 'react';

import { MdClear } from 'react-icons/md';
import ProductCard from '../../components/ProductCard';
import ProductScroll from '../../components/ProductScroll';

import api from '../../services/api';

export default function Home() {
  const [products, setProducts] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadAllProducts() {
      const res = await api.get('product');
      setProducts(res.data);
      if (res.data[0]) {
        const categoriesSet = new Set(res.data.map((p) => p.category));
        const cats = [...categoriesSet];
        setCategories(cats);
      }
    }
    loadAllProducts();
  }, []);

  function generateProductCards(category) {
    if (products[0] && categories[0]) {
      const prodsByCat = products.filter((p) => p.category === category);
      const cards = prodsByCat.map((p) => (
        <ProductCard text={p.name} description={p.description} key={p.id} />
      ));
      return cards;
    }

    return null;
  }

  function generateScrolls(cats) {
    cats.map((cat) => (
      <div style={{ width: '100%' }}>
        <ProductScroll
          key={cat}
          productCards={generateProductCards(cat)}
          category={cat}
        />
      </div>
    ));
  }
  return (
    <>
      {categories[0]
        ? generateScrolls(categories)
        :
        <div style={{ display: "flex", justifyContent: "center" }}>
          <MdClear />
        </div>
      }
    </>
  );
}
