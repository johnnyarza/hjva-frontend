import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';

import TopBar from '../../../components/TopBar';

function ConcreteDesignTopBar({
  onCleanButton,
  onInputChange,
  onNewButton,
  children,
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
      case 'name':
        label = 'nombre';
        break;
      case 'slump':
        label = 'slump';
        break;
      case 'notes':
        label = 'descripción';
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

  const inputType = () => {
    if (searchField === 'slump') {
      return { type: 'number', min: '0' };
    }
    return { type: 'text' };
  };

  const handleInputChange = ({ value }) => {
    if (searchField) {
      const data = {};
      switch (searchField) {
        case 'slump':
          data[searchField] = value;
          break;
        case 'name':
          data[searchField] = value;
          break;
        case 'notes':
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

  const handleCleanButton = () => {
    switch (searchField) {
      case 'name':
        inputRef.current.value = '';
        break;
      case 'notes':
        inputRef.current.value = '';
        break;
      case 'slump':
        inputRef.current.value = '';
        break;
      case 'updatedAt':
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
        {...inputType()}
        onChange={() => handleInputChange(inputRef.current)}
        placeholder={
          searchLabel?.charAt(0).toUpperCase() + searchLabel.slice(1)
        }
      />
    );
  };

  return (
    <TopBar {...rest}>
      <MenuButton onClick={onNewButton}>Crear</MenuButton>
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
        <MenuItem value="slump" onClick={handleSearchFieldChange}>
          Slump
        </MenuItem>
        <MenuItem value="notes" onClick={handleSearchFieldChange}>
          Descripción
        </MenuItem>
        <MenuItem value="updatedAt" onClick={handleSearchFieldChange}>
          Fecha
        </MenuItem>
      </Menu>
      {prepareInput()}
      <MenuButton onClick={handleCleanButton}>Limpiar Consulta</MenuButton>
      {children}
    </TopBar>
  );
}

export default ConcreteDesignTopBar;

ConcreteDesignTopBar.propTypes = {
  onNewButton: PropTypes.func.isRequired,
  onCleanButton: PropTypes.func,
  onInputChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
};
ConcreteDesignTopBar.defaultProps = {
  onCleanButton: () => {},
  onInputChange: () => {},
  children: <></>,
};
