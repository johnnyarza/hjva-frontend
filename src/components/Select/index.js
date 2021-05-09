import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { MdInfoOutline } from 'react-icons/md';
import { Container, Content, Tooltip } from './style';

export default function Select({ name, children, placeHolder, ...rest }) {
  const refSelect = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [hasError, setHasError] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: refSelect.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    setHasError(!!error);
  }, [error]);

  return (
    <Container>
      <Content
        className="select-container"
        isFocused={isFocused}
        hasError={hasError}
      >
        <select
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required
          name={name}
          ref={refSelect}
          className="select-component"
          {...rest}
        >
          {children}
        </select>
        {error && (
          <>
            <Tooltip className="tool-tip">
              <MdInfoOutline className="icon-error" />
              <span className="error-message">{error}</span>
            </Tooltip>
          </>
        )}
      </Content>
    </Container>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  placeHolder: PropTypes.string,
};

Select.defaultProps = {
  placeHolder: 'Escolha opção',
};
