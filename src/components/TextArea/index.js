import React, { useRef, useEffect, useState } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

import { MdInfoOutline } from 'react-icons/md';
import { Container, Content, Tooltip } from './style';

export default function TextArea({ name, ...rest }) {
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [hasError, setHasError] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    setHasError(!!error);
  }, [error]);

  return (
    <Container>
      <Content isFocused={isFocused} hasError={hasError}>
        <textarea
          className="text-area"
          name={name}
          ref={textRef}
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

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
};
