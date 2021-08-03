import React, { useState, useEffect, useContext } from 'react';
import { MdErrorOutline } from 'react-icons/md';

import Loading from '../../components/Spinner';
import Card from '../../components/HorizontalScrolling/Card';
import ProductScroll from '../../components/HorizontalScrolling';

import api from '../../services/api';
import MobileCards from '../../components/MobileProductCards';

import { InputContext } from '../_layouts/Default/index';

export default function Home() {
  // TODO separar cards por categoria
  const [products, setProducts] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(width <= 768);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchInputValue] = useContext(InputContext);

  useEffect(() => {
    setIsMobile(width <= 768);
  }, [width]);

  useEffect(() => {
    console.log(searchInputValue);
  }, [searchInputValue]);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

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
        <Card text={p.name} description={p.notes} key={p.id} file={p.file} />
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
      ) : isMobile ? (
        <MobileCards data={products} />
      ) : (
        <ProductScroll data={products} />
      )}
    </>
  );
}
