import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';

import TopBar from '../../../../components/TopBar';

function MaterialTransactionTopBar({ onCleanButton, onInputChange, ...rest }) {
  const inputRef = useRef(null);
  const firstDateInputRef = useRef(null);
  const secondDateInputRef = useRef(null);
  const [searchLabel, setSearchLabel] = useState('');
  const [searchField, setSearchField] = useState('');

  const handleSearchFieldChange = (data) => {
    let label = '';
    switch (data.value) {
      case 'material':
        label = 'material';
        break;
      case 'category':
        label = 'categoria';
        break;
      case 'createdAt':
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
      if (searchField !== 'createdAt') {
        data[searchField] = { name: value };
      }
      if (searchField === 'createdAt') {
        data.createdAt = {
          from: firstDateInputRef.current.value,
          to: secondDateInputRef.current.value,
        };
      }
      onInputChange(data);
    }
  };

  const handleCleanButton = () => {
    switch (searchField) {
      case 'material' || 'category':
        inputRef.current.value = '';
        break;
      case 'createdAt':
        firstDateInputRef.current.value = '';
        secondDateInputRef.current.value = '';
        break;
      default:
    }
    onCleanButton();
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
        onChange={() => handleInputChange(inputRef.current)}
        placeholder={
          searchLabel?.charAt(0).toUpperCase() + searchLabel.slice(1)
        }
      />
    );
  };

  return (
    <TopBar {...rest}>
      <Menu
        menuButton={<MenuButton>{`Consultar por ${searchLabel}`}</MenuButton>}
        arrow
        direction="bottom"
        viewScroll="initial"
      >
        <MenuItem value="material" onClick={handleSearchFieldChange}>
          Material
        </MenuItem>
        <MenuItem value="category" onClick={handleSearchFieldChange}>
          Categoria
        </MenuItem>
        <MenuItem value="createdAt" onClick={handleSearchFieldChange}>
          Fecha
        </MenuItem>
      </Menu>
      {prepareInput()}
      <MenuButton onClick={handleCleanButton}>Limpiar Consulta</MenuButton>
    </TopBar>
  );
}

export default MaterialTransactionTopBar;

MaterialTransactionTopBar.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  onCleanButton: PropTypes.func.isRequired,
};
