import styled, { css } from 'styled-components';

export const Container = styled.div`
  .select-container {
    background-color: white;
    width: 100%;
    border-radius: 10px;
    padding: 5px;
  }

  .select-component {
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
