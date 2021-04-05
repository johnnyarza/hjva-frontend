import React from 'react';
import PropTypes from 'prop-types';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { useHistory } from 'react-router-dom';
import { Container, Arrow } from './style';

export default function HorizontalScroll({
  productCards,
  category,
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

HorizontalScroll.propTypes = {
  category: PropTypes.string.isRequired,
  productCards: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};
