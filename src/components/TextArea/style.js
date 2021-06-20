import styled, { css } from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
`;

export const Content = styled.div`
  border-radius: 10px;
  background-color: white;
  min-height: 100px;
  width: 100%;
  padding: 15px 10px 10px 10px;
  transition: width 0.1s;
  position: relative;
  border: 1px solid transparent;
  &:hover {
    border-color: ${darken(0.2, '#EBEBEB')};
  }

  ${(props) => {
    const hasError = props.hasError
      ? css`
          border-color: #e74c3c !important;
        `
      : '';
    const isFocused = props.isFocused
      ? css`
          border-color: #3498db !important;
        `
      : '';
    return `${hasError} ${isFocused}`;
  }}

  .text-area {
    font: 15px 'Roboto';
    border: none;
    resize: vertical;
    height: 100%;
    min-height: 80px;
    width: 100%;
    transition: all 0.2s;
  }
`;

export const Tooltip = styled.div`
  background-color: #e74c3c;
  color: white;

  display: flex;

  border-radius: 15px;

  position: absolute;
  left: 102%;
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
`;
