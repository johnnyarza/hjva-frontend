import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import Toggle from 'react-toggle';

import { Container } from './Styles';

function ToggleSwitch({ name, isChecked }) {
  const [checked, setChecked] = useState(isChecked || false);
  const { fieldName, registerField } = useField(name);
  const inputRef = useRef(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'state',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <Toggle
        ref={inputRef}
        id="cheese-status"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <label htmlFor="cheese-status">Adjacent label tag</label>
    </Container>
  );
}

ToggleSwitch.propTypes = {
  name: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
};

ToggleSwitch.defaultProps = {
  isChecked: false,
};

export default ToggleSwitch;
