import styled, { css } from 'styled-components';

export const Container = styled.div`
  .select-container {
    background-color: white;
    padding: 5px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 100%;
    font-size: 18px;
    margin-bottom: 10px;
  }

  .select-component {
    cursor: pointer;
    border: none;
    font: 15px 'Roboto';
    width: 100%;
    height: 40px;

    &:required:invalid {
      color: gray;
    }
    option[disabled] {
      display: none;
    }
    option {
      color: black;
    }
  }
`;

export const Content = styled.div`
  .tool-tip {
    width: 30px;
  }
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
`;

export const Tooltip = styled.div`
  background-color: #e74c3c;
  color: white;

  display: flex;

  border-radius: 15px;

  position: absolute;
  left: 103%;
  padding: 5px;
  min-height: 25px;

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
