import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  border-radius: 5px;
  padding: 0px 10px 0px 10px;
  background-color: white;
  min-height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  span {
    display: block;
    font-weight: 600;
    user-select: none;
  }

  input {
    border: 1px solid #ebebeb;
    border-radius: 5px;
    height: 25px;
    margin-left: 10px;
    padding: 0px 10px 0px 10px;
    transition: border-color 0.2s;

    :focus {
      border-color: var(--focusedInput) !important;
    }
    :hover {
      border-color: ${darken(0.2, '#ebebeb')};
    }
  }

  button {
    border: none;
    height: 25px;
    border-radius: 5px;
    min-width: 100px;
    margin-left: 10px;
    padding: 0px 10px 0px 10px;
    transition: background-color 0.2s;
    font: 16px 'Roboto';

    :hover {
      background-color: var(--hoverButtonColor);
    }
  }

  svg {
    height: 60%;
    width: auto;
    color: black;
    transition: color 0.2s;
    :hover {
      color: #3498db;
    }
  }
`;

export const Content = styled.div``;
