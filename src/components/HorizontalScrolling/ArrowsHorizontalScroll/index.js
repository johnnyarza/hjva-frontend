import React from 'react';
import PropTypes from 'prop-types';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

import { VisibilityContext } from 'react-horizontal-scrolling-menu';

import { Container, Content, Button } from './styles';

function Arrow({ children, disabled, onClick }) {
  return (
    <Container>
      <Button type="button" disabled={disabled} onClick={onClick}>
        <Content>{children}</Content>
      </Button>
    </Container>
  );
}

export function LeftArrow() {
  const {
    isFirstItemVisible,
    scrollPrev,
    visibleItemsWithoutSeparators,
  } = React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !visibleItemsWithoutSeparators.length && isFirstItemVisible
  );
  React.useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow disabled={disabled} onClick={() => scrollPrev()}>
      <FiChevronLeft />
    </Arrow>
  );
}

export function RightArrow() {
  const {
    isLastItemVisible,
    scrollNext,
    visibleItemsWithoutSeparators,
  } = React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !visibleItemsWithoutSeparators.length && isLastItemVisible
  );
  React.useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow disabled={disabled} onClick={() => scrollNext()}>
      <FiChevronRight />
    </Arrow>
  );
}

Arrow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};
Arrow.defaultProps = {
  children: [],
  disabled: false,
  onClick: () => {},
};
