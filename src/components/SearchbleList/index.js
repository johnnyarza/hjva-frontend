import React, { useEffect, useRef, useState } from 'react';
import PropType from 'prop-types';
import { useField } from '@unform/core';
import { uniqueId } from 'lodash';
import { MdInfoOutline } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';

import Empty from '../Empty';

import {
  Container,
  Option,
  Tooltip,
  Scroll,
  Search,
  ListContainer,
} from './styles';

function SearchbleList({ hasSearch, name, values, ...rest }) {
  const [selectedItemId, setSelectedItemId] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [listContent, setListContent] = useState(null);
  const [filteredList, setFilteredList] = useState(null);
  const {
    fieldName,
    defaultValue,
    error,
    registerField,
    clearError,
  } = useField(name);
  const inputRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    if (values) {
      setListContent(values);
      setFilteredList(values);
    }
  }, [values]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField, defaultValue]);

  const handleClick = (id) => {
    if (inputRef.current.value !== id) {
      inputRef.current.value = id;
    } else {
      inputRef.current.value = '';
    }
    clearError();
  };

  useEffect(() => {
    setSelectedItemId(inputRef?.current?.value);
  }, [inputRef?.current?.value]);

  const handleSearch = () => {
    clearError();
    setSelectedItemId('');
    const filtered = listContent.filter(({ name: contentName }) => {
      if (contentName && typeof contentName === 'string') {
        return contentName
          .toLowerCase()
          .includes(searchRef.current.value.toLowerCase());
      }
      return false;
    });
    setFilteredList(filtered);
  };

  const generateList = () => {
    if (filteredList) {
      const list = [...filteredList].sort((a, b) => a.name.localeCompare(b));

      list.forEach((item, i) => {
        if (item.id === selectedItemId) {
          list.splice(i, 1);
          list.unshift(item);
        }
      });

      return (
        <ListContainer haserror={error} isSearchFocused={isSearchFocused}>
          {error && (
            <div style={{ position: 'relative' }}>
              <Tooltip>
                <MdInfoOutline className="icon-error" />
                <span className="error-message">{error}</span>
              </Tooltip>
            </div>
          )}
          {hasSearch && (
            <Search isSearchFocused={isSearchFocused}>
              <div>
                <input
                  onChange={handleSearch}
                  ref={searchRef}
                  onFocus={() => {
                    setIsSearchFocused(true);
                  }}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <FaSearch />
              </div>
            </Search>
          )}

          {list?.length ? (
            <Scroll>
              {list.map(({ name: showName, id }) => (
                <Option isSelected={selectedItemId === id} key={uniqueId()}>
                  <div>
                    <button
                      className="listOption"
                      type="button"
                      onClick={() => handleClick(id)}
                    >
                      {showName}
                    </button>
                  </div>
                </Option>
              ))}
            </Scroll>
          ) : (
            <Empty />
          )}
        </ListContainer>
      );
    }
    return null;
  };

  return (
    <Container>
      <input
        ref={inputRef}
        defaultValue={defaultValue}
        style={{ display: 'none' }}
        {...rest}
      />
      {generateList()}
    </Container>
  );
}

SearchbleList.propTypes = {
  name: PropType.string.isRequired,
  values: PropType.arrayOf(
    PropType.shape({
      id: PropType.string.isRequired,
      name: PropType.string.isRequired,
    })
  ).isRequired,
  hasSearch: PropType.bool,
};

SearchbleList.defaultProps = {
  hasSearch: false,
};

export default SearchbleList;
