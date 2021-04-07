import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { MdInfoOutline } from 'react-icons/md';
import { Container, Content, Tooltip } from './style';

export default function Input({ name, ...rest }) {
  const [hasError, setHasError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const inputRef = useRef(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    setHasError(!!error);
  }, [error]);

  return (
    <Container>
      <Content hasError={hasError} isFocused={isFocused}>
        <input
          className="component-input"
          ref={inputRef}
          defaultValue={defaultValue}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />

        {error && (
          <>
            <Tooltip>
              <MdInfoOutline className="icon-error" />
              <span className="error-message">{error}</span>
            </Tooltip>
          </>
        )}
      </Content>
    </Container>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
};
