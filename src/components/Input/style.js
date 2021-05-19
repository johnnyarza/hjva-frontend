import styled, { css } from 'styled-components';
/* eslint-disable */
export const Container = styled.div`
  display: flex;
  justify-content: center;


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
