import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

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
    switch (searchField) {
      case 'name':
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

  return (
    <TopBar {...rest}>
      <button type="button" onClick={onNewButton}>
        Crear
      </button>
    </TopBar>
  );
}

export default ClientsTopBar;

ClientsTopBar.propTypes = {
  onNewButton: PropTypes.func.isRequired,
};
