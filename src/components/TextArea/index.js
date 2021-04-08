import React, { useRef, useEffect, useState } from 'react';
import { useField } from '@unform/core';

import { Container, Content } from './style';

export default function TextArea({ name, ...rest }) {
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <Content isFocused={isFocused}>
        <textarea
          className="text-area"
          name={name}
          ref={textRef}
          defaultValue={defaultValue}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
      </Content>
    </Container>
  );
}
