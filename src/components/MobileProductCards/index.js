import React, { useEffect, useState } from 'react';
import { FaImage } from 'react-icons/fa';

import { Container, Content } from './styles';
import Card from './Card';

function MobileProductCards({ data }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(data);
  }, [data]);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <Container>
      <Content>
        {products.map(({ name, notes, file }) => (
          <Card name={name} notes={notes} images={file} />
        ))}
      </Content>
    </Container>
  );
}

export default MobileProductCards;
