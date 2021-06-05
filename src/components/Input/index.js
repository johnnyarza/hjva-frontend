import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { MdInfoOutline } from 'react-icons/md';
import { Container, Content, Tooltip } from './style';

export default function Input({ name, hasBorder, position, ...rest }) {
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
      <Content
        hasBorder={hasBorder}
        hasError={hasError}
        isFocused={isFocused}
        className="input-container"
      >
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
            <Tooltip position={position}>
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
  hasBorder: PropTypes.bool,
  position: PropTypes.oneOf(['right', 'left']),
};

Input.defaultProps = {
  hasBorder: true,
  position: 'right',
};
