import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';

import TopBar from '../../../../components/TopBar';

function CompressionTestTopBar({ onInputChange, onCleanButton, onNewButton }) {
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
      case 'client':
        label = 'cliente';
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
        case 'tracker':
          data[searchField] = value;
          break;
        case 'client':
          data[searchField] = { name: value };
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
      case 'tracker' || 'client':
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

  return (
    <TopBar>
      <Menu
        menuButton={<MenuButton>Ensayo</MenuButton>}
        arrow
        direction="bottom"
        viewScroll="initial"
      >
        <MenuItem onClick={onNewButton}>Crear</MenuItem>
      </Menu>
      <Menu
        menuButton={<MenuButton>Registro</MenuButton>}
        arrow
        direction="bottom"
        viewScroll="initial"
      >
        <MenuItem>
          <Link to="/concreteDesigns" style={{ color: 'black' }}>
            Dosificaciones
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/stock" style={{ color: 'black' }}>
            Materiales
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/providers" style={{ color: 'black' }}>
            Proveedores
          </Link>
        </MenuItem>
      </Menu>
      <Menu
        menuButton={<MenuButton>{`Consultar por ${searchLabel}`}</MenuButton>}
        arrow
        direction="bottom"
        viewScroll="initial"
      >
        <MenuItem value="tracker" onClick={handleSearchFieldChange}>
          Numero
        </MenuItem>
        <MenuItem value="client" onClick={handleSearchFieldChange}>
          Cliente
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
CompressionTestTopBar.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  onCleanButton: PropTypes.func.isRequired,
  onNewButton: PropTypes.func.isRequired,
};
export default CompressionTestTopBar;
