import styled, { css } from 'styled-components';
import { darken } from 'polished';

export const ListsContainer = styled.div`
  display: grid;
  grid-template-columns: 45% 10% 45%;
  grid-template-rows: 20px auto;
  margin: 0px 0px 10px 0px;
`;

export const MiddleContainer = styled.div`
  grid-area: 1/2/3/3;
  display: grid;
  grid-template-columns: 100%;
  svg {
    place-self: center;
    width: 24px;
    height: auto;
  }
`;

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
  margin-top: 3px;

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
