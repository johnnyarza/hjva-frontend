import React from 'react';
import { MdClear } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Container } from './style';

export default function Empty({ text = 'Vazio' }) {
  return (
    <Container>
      <MdClear />
      <span>{text}</span>
    </Container>
  );
}

Empty.propTypes = {
  text: PropTypes.string,
};

Empty.defaultProps = {
  text: 'Vazio',
};
