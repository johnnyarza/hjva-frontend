import styled, { css } from 'styled-components';

export const Container = styled.div`
  padding: 10px;
  width: 100%;
`;

export const Content = styled.div`
  border-radius: 10px;
  background-color: white;
  min-height: 100px;
  width: 100%;
  padding: 10px;
  transition: all 0.2s;
  position: relative;

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
