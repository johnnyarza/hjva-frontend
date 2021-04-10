import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { MdInfoOutline } from 'react-icons/md';
import { Container, Content, Tooltip } from './style';

export default function Select({ name, optionsData, placeHolder, ...rest }) {
  const refSelect = useRef(null);
  const [options, setOptions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: refSelect.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    if (optionsData.length) setOptions(optionsData);
    setHasError(!!error);
  }, [optionsData, error]);

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
          defaultValue=""
          required
          placeholder="escolha"
          name={name}
          {...rest}
          ref={refSelect}
          className="select-component"
        >
          <option value="" disabled>
            {placeHolder}
          </option>
          {options.length &&
            options.map((o) => (
              <option value={o} key={`select-${o}`}>
                {o}
              </option>
            ))}
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
  optionsData: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeHolder: PropTypes.string,
};

Select.defaultProps = {
  placeHolder: 'Escolha opção',
};
