import React, { useEffect, ReactText, useState } from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function Label({ label, children, ...rest }) {
  return (
    <Container
      {...rest}
      style={{
        whiteSpace: 'nowrap',
        position: 'relative',
        marginTop: label ? '5px' : '0',
      }}
    >
      {label && <text className="label-text">{label}</text>}
      {children}
    </Container>
  );
}

export default Label;

Label.propTypes = {
  label: PropTypes.string,
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

Label.defaultProps = {
  label: '',
};
