import styled, { css } from 'styled-components';

export const Container = styled.div``;

export const Content = styled.div`
  padding: 10px;
  border-radius: 10px;
  background-color: white;
  width: 200px;

  ${(props) => {
    const hasError = props.hasError
      ? css`
          border: 1px solid #e74c3c;
        `
      : '';
    const isFocused = props.isFocused
      ? css`
          box-shadow: rgba(0, 0, 0, 0.8) 0 0 5px;
        `
      : '';
    return `${hasError} ${isFocused}`;
  }}

  .text-area {
    font: 15px 'Roboto';
    border: none;
    resize: vertical;
    min-height: 100px;
    transition: all 0.2s;
  }
`;
