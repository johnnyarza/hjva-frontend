import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { useHistory } from 'react-router-dom';
import { Container, Arrow } from './style';

export default function HorizontalScroll({ productCards, category }) {
  const history = useHistory();

  function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

    return (
      <button type="button" onClick={() => scrollPrev()}>
        <FiChevronLeft>Left</FiChevronLeft>
      </button>
    );
  }

  function RightArrow() {
    const { isFirstItemVisible, scrollNext } = useContext(VisibilityContext);
    return (
      <button
        onClick={() => {
          scrollNext();
        }}
        type="button"
      >
        <FiChevronRight>Right</FiChevronRight>
      </button>
    );
  }
  return (
    <Container>
      <span>{category}</span>
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {productCards}
      </ScrollMenu>
    </Container>
  );
}

HorizontalScroll.propTypes = {
  category: PropTypes.string.isRequired,
  productCards: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
};
