import styled, { css } from 'styled-components';
/* eslint-disable */
export const Container = styled.div`
  display: flex;
  justify-content: center;

  #date-input-calc-button{
    background-color: transparent;
    width: auto;
    box-shadow: none;

    :hover{
      box-shadow: none;
    }

    svg{
      display: block;
      color: black;
      width: 15px;
    }
  }


  .component-input {
    font: 15px 'Roboto';
    border: none;
    margin: 0;
    height: 40px;
    width:100%;
  }

  .input-container{
    background-color: white;
    padding: 5px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    min-width: 200px;
    font-size: 18px;
    margin-bottom: 10px;

  }

`;
/* eslint-enable */

export const Content = styled.div`
  width: 100%;
  ${(props) =>
    props.hasBorder
      ? css`
          border: 1px solid black;
        `
      : css`
          border: none;
        `}
  ${(props) => {
    const hasError = props.hasError
      ? css`
          border: 1px solid #e74c3c;
        `
      : css``;
    const isFocused = props.isFocused
      ? css`
          border: 1px solid #3498db;
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
  ${(props) =>
    props.position === 'left'
      ? css`
          right: 103%;
        `
      : css`
          left: 103%;
        `}

  padding: 5px;
  min-height: 25px;
  width: 30px;

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

export const CalcInput = styled.div`
  display: flex;
  position: absolute;
  left: 103%;

  font: 15px 'Roboto';
  input {
    padding: 5px 5px 5px 10px;
    border-radius: 15px;
    border: none;
    max-width: 80px;
    ${(props) => {
      const isFocused = props.isFocused
        ? css`
            border: 1px solid #3498db;
          `
        : '';
      return `${isFocused}`;
    }}
  }
  margin: 0;
  min-height: 50px;
`;
