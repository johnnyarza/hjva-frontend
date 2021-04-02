import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { useHistory } from 'react-router-dom';
import { Container, Arrow } from './style';

export default function HorizontalScroll({
  productCards,
  category = 'Categoria',
}) {
  const history = useHistory();
  return (
    <Container>
      <span>{category}</span>
      <ScrollMenu
        key={category}
        data={productCards}
        arrowLeft={<Arrow>{'<'}</Arrow>}
        arrowRight={<Arrow>{'>'}</Arrow>}
        menuStyle={{ justifyContent: 'space-between' }}
        wrapperStyle={{ width: '90%' }}
        wheel={false}
        dragging={false}
        alignCenter
        onSelect={(p) => history.push(`/product/${p}`)}
      />
    </Container>
  );
}
