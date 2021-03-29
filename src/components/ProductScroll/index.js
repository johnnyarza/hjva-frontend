import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { Container, Arrow } from './style';

export default function HorizontalScroll({
  productCards,
  category = 'Categoria',
}) {
  return (
    <Container>
      <ScrollMenu
        data={productCards}
        arrowLeft={<Arrow>{'<'}</Arrow>}
        arrowRight={<Arrow>{'>'}</Arrow>}
        menuStyle={{ justifyContent: 'space-between' }}
        wrapperStyle={{ width: '100%' }}
        wheel={false}
        dragging={false}
      />
    </Container>
  );
}
