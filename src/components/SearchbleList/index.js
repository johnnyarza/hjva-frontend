import React, { useEffect, useRef } from 'react';
import Select from 'react-select';
import PropType from 'prop-types';
import { useField } from '@unform/core';

import { MdInfoOutline } from 'react-icons/md';
import { Container, Tooltip } from './styles';

function SearchbleList({ name, values, position, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'state.value',
    });
  }, [fieldName, registerField]);

  const style = {
    container: (provided) => ({
      ...provided,
      marginBottom: '10px',
    }),
    control: (provided, state) => {
      return {
        ...provided,
        border: '1px solid transparent',
        borderColor: error
          ? 'red !important'
          : state.isFocused && '#3498db !important',
        boxShadow: 'none',
        borderRadius: '10px',
        height: '52px',
      };
    },
    menu: (provided) => ({ ...provided, zIndex: '3' }),
    menuList: (provided) => ({ ...provided, maxHeight: '100px' }),
  };

  return (
    <Container>
      <Select {...rest} ref={inputRef} options={values} styles={style} />

      {error && (
        <>
          <Tooltip position={position}>
            <MdInfoOutline className="icon-error" />
            <span className="error-message">{error}</span>
          </Tooltip>
        </>
      )}
    </Container>
  );
}

SearchbleList.propTypes = {
  position: PropType.oneOf(['right', 'left']),
  name: PropType.string.isRequired,
  values: PropType.arrayOf(
    PropType.shape({
      value: PropType.string.isRequired,
      label: PropType.string.isRequired,
    })
  ).isRequired,
};

SearchbleList.defaultProps = {
  position: 'right',
};

export default SearchbleList;
