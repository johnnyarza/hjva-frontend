import React, { useState } from 'react';
import Toggle from 'react-toggle';

import { Container } from './Styles';

function ToggleSwitch() {
  const [checked, setChecked] = useState(false);
  return (
    <Container>
      <Toggle
        id="cheese-status"
        defaultChecked={checked}
        onChange={() => setChecked(!checked)}
      />
      <label htmlFor="cheese-status">Adjacent label tag</label>
    </Container>
  );
}

export default ToggleSwitch;
