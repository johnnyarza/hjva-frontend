import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { MdInfoOutline } from 'react-icons/md';
import { FaCalculator, FaCheck } from 'react-icons/fa';
import { Container, Content, Tooltip, CalcInput } from './style';

export default function Input({
  name,
  hasBorder,
  position,
  onCalcClick,
  ...rest
}) {
  const [hasError, setHasError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isCalcFocused, setIsCalcFocused] = useState(false);
  const [showCalcInput, setShowCalcInput] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const inputRef = useRef(null);
  const calcInputRef = useRef();

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

  const handleCalc = () => {
    let days = 0;
    if (calcInputRef.current) {
      const { value } = calcInputRef.current;
      if (value) days = value;
    }
    onCalcClick(days);
    setShowCalcInput(!showCalcInput);
  };

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
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />

        <button type="button" id="date-input-calc-button" onClick={handleCalc}>
          {showCalcInput ? <FaCheck /> : <FaCalculator />}
        </button>

        {error && (
          <>
            <Tooltip position={position}>
              <MdInfoOutline className="icon-error" />
              <span className="error-message">{error}</span>
            </Tooltip>
          </>
        )}
        {showCalcInput && (
          <>
            <CalcInput isFocused={isCalcFocused}>
              <input
                onFocus={() => {
                  setIsCalcFocused(true);
                }}
                onBlur={() => setIsCalcFocused(false)}
                type="number"
                placeholder="días ?"
                ref={calcInputRef}
                min="0"
                step="1"
              />
            </CalcInput>
          </>
        )}
      </Content>
    </Container>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  onCalcClick: PropTypes.func.isRequired,
  hasBorder: PropTypes.bool,
  position: PropTypes.oneOf(['right', 'left']),
};

Input.defaultProps = {
  hasBorder: true,
  position: 'right',
};
