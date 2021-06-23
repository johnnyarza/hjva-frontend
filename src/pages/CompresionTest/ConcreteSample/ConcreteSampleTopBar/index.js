import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';

import TopBar from '../../../../components/TopBar';

function ConcreteSampleTopBar({
  onNewButton,
  onCleanButton,
  onInputChange,
  ...rest
}) {
  const inputRef = useRef(null);
  const firstDateInputRef = useRef(null);
  const secondDateInputRef = useRef(null);
  const [searchLabel, setSearchLabel] = useState('');
  const [searchField, setSearchField] = useState('');

  const handleSearchFieldChange = (data) => {
    let label = '';
    switch (data.value) {
      case 'tracker':
        label = 'numero';
        break;
      case 'sampledAt':
        label = 'fecha moldeo';
        break;
      case 'loadedAt':
        label = 'fecha rotura';
        break;
      case 'days':
        label = 'días';
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
        case 'tracker':
          data[searchField] = value;
          break;
        case 'sampledAt':
          data[searchField] = {
            from: firstDateInputRef.current.value,
            to: secondDateInputRef.current.value,
          };
          break;
        case 'loadedAt':
          data[searchField] = {
            from: firstDateInputRef.current.value,
            to: secondDateInputRef.current.value,
          };
          break;
        case 'days':
          data[searchField] = value;
          break;
        default:
      }
      onInputChange(data);
    }
  };

  const inputType = () => {
    if (searchField === 'tracker' || searchField === 'days') {
      return { type: 'number', min: '0' };
    }
    return { type: 'text' };
  };

  const prepareInput = () => {
    if (searchField === 'loadedAt' || searchField === 'sampledAt') {
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
        {...inputType()}
        ref={inputRef}
        onChange={() => handleInputChange(inputRef.current)}
        placeholder={
          searchLabel?.charAt(0).toUpperCase() + searchLabel.slice(1)
        }
      />
    );
  };

  const handleCleanButton = () => {
    switch (searchField) {
      case 'days' || 'tracker':
        inputRef.current.value = '';
        break;
      case 'loadedAt' || 'sampledAt':
        firstDateInputRef.current.value = '';
        secondDateInputRef.current.value = '';
        break;
      default:
    }
    onCleanButton();
  };

  return (
    <TopBar {...rest}>
      <MenuButton onClick={onNewButton}>Crear</MenuButton>
      <Menu
        menuButton={<MenuButton>{`Consultar por ${searchLabel}`}</MenuButton>}
        arrow
        direction="bottom"
        viewScroll="initial"
      >
        <MenuItem value="tracker" onClick={handleSearchFieldChange}>
          Numero
        </MenuItem>
        <MenuItem value="sampledAt" onClick={handleSearchFieldChange}>
          Fecha Moldeo
        </MenuItem>
        <MenuItem value="loadedAt" onClick={handleSearchFieldChange}>
          Fecha Rotura
        </MenuItem>
        <MenuItem value="days" onClick={handleSearchFieldChange}>
          Días
        </MenuItem>
      </Menu>
      {prepareInput()}
      <MenuButton onClick={handleCleanButton}>Limpiar Consulta</MenuButton>
    </TopBar>
  );
}

ConcreteSampleTopBar.propTypes = {
  onNewButton: PropTypes.func.isRequired,
  onCleanButton: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};
export default ConcreteSampleTopBar;
