import React, { useState, useEffect } from 'react';
import { MdErrorOutline } from 'react-icons/md';

import Loading from '../../components/Spinner';
import ProductCard from '../../components/HorizontalScrolling/Card';
import ProductScroll from '../../components/HorizontalScrolling';

import api from '../../services/api';

import Empty from '../../components/Empty';

export default function Home() {
  // TODO separar cards por categoria
  const [products, setProducts] = useState({});
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function loadAllProducts() {
      try {
        const { data } = await api.get('materialsToSell');
        console.log(data);
        setProducts(data);
        if (data) {
          const categoriesSet = new Set(data.map((p) => p.category.name));
          setCategories([...categoriesSet]);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setHasError(true);
      }
    }

    loadAllProducts();
  }, []);

  function generateProductCards(category) {
    if (products[0] && categories[0]) {
      const prodsByCat = products.filter((p) => p.category.name === category);
      const cards = prodsByCat.map((p) => (
        <ProductCard
          text={p.name}
          description={p.notes}
          key={p.id}
          file={p.file}
        />
      ));
      return cards;
    }

    return null;
  }

  function generateScrolls(cats) {
    return cats.map((cat) => (
      <div style={{ width: '100%' }} key={cat}>
        <ProductScroll
          productCards={generateProductCards(cat)}
          category={cat}
        />
      </div>
    ));
  }
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : hasError ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <MdErrorOutline
            style={{
              height: '100px',
              width: 'auto',
              color: 'var(--errorColor)',
            }}
          />
        </div>
      ) : (
        <ProductScroll data={products} />
      )}
    </>
  );
}
