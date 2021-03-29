import React from 'react';

import PropTypes from 'prop-types';
import { Container, Content } from './style';

export default function AuthLayout({ children }) {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

// PropTypes.element.isRequired é a associado a um elemento que vem com tag
// neste caso os children geralmente vem como elementos de tag
