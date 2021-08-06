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
  const [products, setProducts] = useState('');
  const [filteredProducts, setFilteredProducts] = useState('');
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(width <= 768);
  const [categories, setCategories] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchInputValue] = useContext(InputContext);

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
    let tOut = '';
    if (searchInputValue) {
      const filtered = products.filter(({ name }) =>
        name.toLowerCase().includes(searchInputValue.toLowerCase())
      );
      tOut = setTimeout(() => setFilteredProducts(filtered), 500);
    }
    if (!searchInputValue) setFilteredProducts('');
    return () => {
      if (tOut) {
        clearTimeout(tOut);
      }
    };
  }, [searchInputValue, products]);

  useEffect(() => {
    setIsMobile(width <= 768);
  }, [width]);

  useEffect(() => {
    if (!hasError && categories && products) {
      setIsLoading(false);
    }
    if (hasError) setIsLoading(false);
  }, [hasError, categories, products]);

  useEffect(() => {
    async function loadAllProducts() {
      try {
        const { data } = await api.get('materialsToSell');
        setProducts(data);
      } catch (error) {
        setHasError(true);
      }
    }

    loadAllProducts();
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      const { data: cats } = await api.get('categories');
      if (cats) setCategories(cats);
    };
    loadCategories();
  }, []);

  const createScrollByCategories = () => {
    if (categories && products) {
      const byCat = categories.map(({ id: catId, name: catName }) => {
        const filteredProds = (filteredProducts || products).filter(
          ({ category }) => category.id === catId
        );
        const scrolls = isMobile ? (
          <div>
            <h2 style={{ marginBottom: '8px' }}>{catName}</h2>
            <MobileCards data={filteredProds} />
          </div>
        ) : (
          <div style={{ marginBottom: '10px' }}>
            <h2>{catName}</h2>
            <ProductScroll data={filteredProds} />
          </div>
        );

        return !filteredProds.length ? '' : scrolls;
      });
      return byCat;
    }
    return '';
  };

  // useEffect(() => {
  //   createScrollByCategories();
  // }, [categories, products]);

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
        createScrollByCategories()
      )}
    </>
  );
}

/* <>
          <h2>Bloques</h2>
          <ProductScroll
            data={filteredProducts || products}
            categories={categories}
          />
        </> */
