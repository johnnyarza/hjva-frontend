import styled, { css } from 'styled-components';
import { darken } from 'polished';

export const ListContainer = styled.div`
  background-color: white;
  min-width: 200px;
  padding: 10px 0px 5px 0px;
  border-radius: 10px;
  border: 1px solid transparent;
  max-height: 300px;
  overflow: auto;
  overflow-x: hidden;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${darken(0.2, '#EBEBEB')};
  }

  ${(props) =>
    props.isFocused
      ? css`
          border-color: var(--focusedInput) !important;
        `
      : css`
          border-color: transparent;
        `}

  ${(props) => {
    const hasError = props.hasError
      ? css`
          border: 1px solid var(--errorColor) !important;
        `
      : css``;
    return `${hasError}`;
  }}
`;

export const ToolTip = styled.div`
  background-color: #e74c3c;
  color: white;

  display: flex;

  border-radius: 15px;

  position: absolute;
  left: 103%;
  padding: 5px;
  min-height: 25px;
  width: 30px;

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

  ${(props) => {
    const hasError = props.hasError
      ? css`
          display: flex;
        `
      : css`
          display: none;
        `;
    return `${hasError}`;
  }}
`;

export const SearchContainer = styled.div`
  padding: 5px 10px 0 5px;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    border-bottom: ${(props) =>
      `1px solid ${props.isFocused ? 'black' : '#ebebeb'}`};
    transition: border-bottom 0.2s;
  }

  input {
    border: none;
  }
  svg {
    color: ${(props) => (props.isFocused ? 'black' : '#bdc3c7')};
    margin-left: 10px;
    transition: color 0.2s;
  }
`;

export const Row = styled.li`
  padding: 0px 5px 0px 5px;
  :nth-child(even) {
    border-bottom: 1px solid #ebebeb;
    border-top: 1px solid #ebebeb;
  }
  :hover {
    background-color: #ecf0f1;
  }
  ${(props) =>
    props.selected
      ? css`
          background-color: #2ecc71 !important;
        `
      : ''}
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  span {
    margin: 0;
  }
  button {
    background-color: transparent;
    width: 100%;
    min-height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    padding: 0;
    box-shadow: none !important;

    &:focus {
      box-shadow: none;
    }

    :hover {
      box-shadow: none;
    }

    svg {
      color: black;
      display: block;
      :hover {
        color: #2ecc71;
      }
    }
  }
`;
