import styled, { css } from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';

export const Search = styled.div`
  width: 100%;
  padding: 5px 10px 5px 10px;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: border 0.3s;
  }

  ${(props) => {
    return props.isSearchFocused
      ? css`
          svg {
            color: black;
          }
          div {
            border-bottom: 1px solid black;
          }
        `
      : css`
          svg {
            color: #bdc3c7;
          }
          div {
            border-bottom: 1px solid #ebebeb;
          }
        `;
  }}

  svg {
    height: 100%;
    width: auto;
    transition: color 0.2s;
  }

  input {
    width: 100%;
    height: 40px;
    border: none;
  }
`;
export const Scroll = styled(PerfectScrollbar)`
  max-height: 205px;
`;

export const Container = styled.div`
  margin-bottom: 10px;
`;

export const ListContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid #3498db;
  }

  ${(props) => {
    const hasError = props.haserror
      ? css`
          border-color: #e74c3c;
        `
      : css``;
    return `${hasError}`;
  }}
  ${(props) => {
    return props.isSearchFocused
      ? css`
          border-color: #3498db;
        `
      : '';
  }}
`;

export const Option = styled.div`
  width: 100%;

  :last-child {
    border-radius: 0 0 10px 10px;
  }

  & + div {
    border-top: solid 1px #ebebeb;
  }

  .listOption {
    border-radius: 0;
    background-color: transparent;
    color: black;
    width: 100%;
    box-shadow: none;
    height: 50px;
    transition: font-weight 0.1s;

    :hover {
      box-shadow: none;
    }
    :focus {
      box-shadow: none;
    }
  }

  &:hover {
    button {
      font-weight: 700;
    }
  }
  ${(props) =>
    props.isSelected
      ? css`
          background-color: #2ecc71;
        `
      : ''}
`;

export const Tooltip = styled.div`
  background-color: #e74c3c;
  color: white;
  display: flex;
  align-items: center;

  border-radius: 15px;
  position: absolute;
  top: 10px;

  padding: 5px;
  min-height: 25px;
  width: 30px;

  ${(props) =>
    props.position === 'left'
      ? css`
          right: 103%;
        `
      : css`
          left: 103%;
        `}

  z-index: 2;
  transition: all 0.2s;

  .icon-error {
    display: block;

    height: 20px;
    align-self: center;
    width: auto;
  }

  .error-message {
    color: white;
    display: none;
    font-size: 12px;
    white-space: nowrap;
    margin: 0 0 0 5px;
    align-self: center;
    font-weight: 400;
  }

  &:hover {
    width: auto;
    .error-message {
      display: block;
    }
  }
`;
