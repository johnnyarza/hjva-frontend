import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';

import { Container } from './styles';

function TopBar({
  buttons,
  fields,
  onCleanSearchButton,
  onSearchInputChange,
  ...rest
}) {
  const inputRef = useRef(null);
  const fromDateInputRef = useRef(null);
  const toDateInputRef = useRef(null);
  const [searchField, setSearchField] = useState('');
  // const fields = [
  //   { field: 'name', label: 'Nombre', inputProps: { type: 'text' } },
  // ];
  // const buttons = [{ label: 'Crear', onClick: () => console.log('clicou') }];

  const handleSearchFieldClick = (target) => {
    setSearchField(target.value);
  };

  const handleInputChange = () => {
    const data = {};
    const { inputProps, field } = searchField;
    const { type } = inputProps || { type: '' };
    if (type === 'date') {
      data[field] = {
        from: fromDateInputRef.current.value,
        to: toDateInputRef.current.value,
      };
    }
    if (type !== 'date') {
      data[field] = inputRef.current.value;
    }
    onSearchInputChange(data);
  };

  const prepareInput = () => {
    const { inputProps, label, field } = searchField;
    const { type } = inputProps || { type: '' };

    if (type === 'date') {
      return (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '40px auto 60px auto',
            placeItems: 'center center',
          }}
        >
          <span>de</span>
          <input
            disabled={!searchField}
            name="from"
            type="date"
            ref={fromDateInputRef}
            onChange={() => handleInputChange()}
          />
          <span>hasta</span>
          <input
            disabled={!searchField}
            name="to"
            type="date"
            ref={toDateInputRef}
            onChange={() => handleInputChange()}
          />
        </div>
      );
    }

    return (
      <input
        {...inputProps}
        placeholder={label || ''}
        disabled={!field}
        ref={inputRef}
        onChange={() => handleInputChange(inputRef)}
      />
    );
  };

  const handleCleanButton = () => {
    const { inputProps } = searchField;
    const { type } = inputProps || { type: '' };
    if (type === 'date') {
      toDateInputRef.current.value = '';
      fromDateInputRef.current.value = '';
    }
    if (type !== 'date') {
      inputRef.current.value = '';
    }

    onCleanSearchButton();
  };

  return (
    <Container {...rest}>
      {buttons.map(({ label, onClick }) => {
        return (
          <button type="button" onClick={onClick}>
            {label}
          </button>
        );
      })}
      <Menu
        menuButton={
          <MenuButton>{`Consultar por ${
            searchField?.label || '?'
          }`}</MenuButton>
        }
        arrow
        direction="bottom"
        viewScroll="initial"
      >
        {fields?.map(({ field, label, inputProps }) => {
          return (
            <MenuItem
              onClick={handleSearchFieldClick}
              value={{ field, label, inputProps }}
            >
              {label}
            </MenuItem>
          );
        })}
      </Menu>
      {prepareInput()}
      <MenuButton onClick={handleCleanButton}>Limpiar Consulta</MenuButton>
    </Container>
  );
}

TopBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};

export default TopBar;
