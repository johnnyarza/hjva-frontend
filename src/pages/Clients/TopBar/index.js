import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { MenuButton, MenuItem, Menu } from '@szhsin/react-menu';

import TopBar from '../../../components/TopBar';

function ClientsTopBar({ onNewButton, onCleanButton, onInputChange, ...rest }) {
  const inputRef = useRef(null);
  const firstDateInputRef = useRef(null);
  const secondDateInputRef = useRef(null);
  const [searchLabel, setSearchLabel] = useState('');
  const [searchField, setSearchField] = useState('');

  const handleSearchFieldChange = (data) => {
    let label = '';
    switch (data.value) {
      case 'name':
        label = 'nombre';
        break;
      case 'email':
        label = 'Correo E.';
        break;
      case 'phone':
        label = 'Telefono';
        break;
      case 'updatedAt':
        label = 'fecha';
        break;
      default:
        label = '';
    }
    setSearchLabel(label);
    setSearchField(data.value);
  };

  const handleInputChange = ({ value }) => {
    if (searchField) {
      const data = {};
      switch (searchField) {
        case 'name':
          data[searchField] = value;
          break;
        case 'email':
          data[searchField] = value;
          break;
        case 'phone':
          data[searchField] = value;
          break;
        case 'updatedAt':
          data[searchField] = {
            from: firstDateInputRef.current.value,
            to: secondDateInputRef.current.value,
          };
          break;
        default:
      }
      onInputChange(data);
    }
  };

  const inputType = () => {
    if (searchField === 'tracker') {
      return { type: 'number', min: '0' };
    }
    return { type: 'text' };
  };

  const prepareInput = () => {
    if (searchLabel === 'fecha') {
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
            name="from"
            type="date"
            ref={firstDateInputRef}
            onChange={() => handleInputChange(firstDateInputRef.current)}
          />
          <span>hasta</span>
          <input
            name="to"
            type="date"
            ref={secondDateInputRef}
            onChange={() => handleInputChange(secondDateInputRef.current)}
          />
        </div>
      );
    }
    return (
      <input
        disabled={!searchField}
        ref={inputRef}
        {...inputType()}
        onChange={() => handleInputChange(inputRef.current)}
        placeholder={
          searchLabel?.charAt(0).toUpperCase() + searchLabel.slice(1)
        }
      />
    );
  };

  const handleCleanButton = () => {
    if (searchField !== 'updatedAt') {
      inputRef.current.value = '';
    }
    if (searchField === 'updatedAt') {
      firstDateInputRef.current.value = '';
      secondDateInputRef.current.value = '';
    }
    onCleanButton();
  };

  return (
    <TopBar {...rest}>
      <button type="button" onClick={onNewButton}>
        Crear
      </button>
      <Menu
        menuButton={
          <MenuButton>{`Consultar por ${searchLabel || '?'}`}</MenuButton>
        }
        arrow
        direction="bottom"
        viewScroll="initial"
      >
        <MenuItem value="name" onClick={handleSearchFieldChange}>
          Nombre
        </MenuItem>
        <MenuItem value="phone" onClick={handleSearchFieldChange}>
          Telefono
        </MenuItem>
        <MenuItem value="email" onClick={handleSearchFieldChange}>
          Correro E.
        </MenuItem>
        <MenuItem value="updatedAt" onClick={handleSearchFieldChange}>
          Fecha
        </MenuItem>
      </Menu>
      {prepareInput()}
      <MenuButton onClick={handleCleanButton}>Limpiar Consulta</MenuButton>
    </TopBar>
  );
}

export default ClientsTopBar;

ClientsTopBar.propTypes = {
  onNewButton: PropTypes.func.isRequired,
  onCleanButton: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};
