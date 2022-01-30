import React, { useContext, useEffect, useState } from 'react';

import { Link, useParams } from 'react-router-dom';

import { MdKeyboardBackspace } from 'react-icons/md';
import { Container, Content, Texts } from './style';
import Images from './Images';

import { IsMobileContext } from '../_layouts/Default/index';
import Spinner from '../../components/Spinner';

import api from '../../services/api';

export default function Product() {
  const [isMobile] = useContext(IsMobileContext);
  const [product, setProduct] = useState('');
  const [id, setId] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const { id: urlId } = useParams();

  useEffect(() => {
    setId(urlId);
  }, [urlId]);

  useEffect(() => {
    if (product) {
      setIsLoading(false);
    }
  }, [product]);

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        const { data } = await api.get(`/material/${id}`);
        setProduct(data || {});
      }
    };
    loadProduct();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Container>
          <Content isMobile={isMobile}>
            <div className="back-button">
              <Link to="/">
                <MdKeyboardBackspace />
              </Link>
            </div>
            <Images images={product.file} />
            <Texts isMobile={isMobile}>
              <div className="title">
                <h3>{product.name}</h3>
              </div>
              <div className="notes">
                <pre>{product.notes}</pre>
              </div>
            </Texts>
          </Content>
        </Container>
      )}
    </>
  );
}
