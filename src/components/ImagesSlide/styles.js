import styled, { css } from 'styled-components';
import { FaImage } from 'react-icons/fa';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 40px 395px 40px;
  grid-template-rows: 375px 20px;
  row-gap: 5px;
  label,
  button {
    transition: box-shadow 0.2s;
    box-shadow: none !important;

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.8) 0 0 5px !important;
    }

    &:active {
      box-shadow: rgba(0, 0, 0, 0.8) 0 0 10px !important;
    }
  }
`;

export const Content = styled.div`
  height: 100%;
  width: 100%;
  ${(props) => {
    return props.hasUrl
      ? css`
          background: url(${props.hasUrl});
        `
      : '';
  }}
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

export const Arrow = styled.button`
  place-self: center;
  display: block;
  border-radius: 35px !important;
  width: 35px !important;
  height: 35px !important;
  background-color: white;
  display: flex;
  justify-content: center !important;
  align-items: center !important;

  svg {
    color: black;
    width: 20px;
    height: auto;
  }
`;

export const Empty = styled(FaImage)`
  grid-column: 2;
  place-self: center;
  width: 50px;
  height: auto;
`;

export const ImageControls = styled.div`
  display: grid;
  grid-template-columns: 20px 20px;
  column-gap: 5px;
  grid-row: 2;
  grid-column: 2;
  place-self: center;

  input {
    display: none;
  }

  span {
    margin: 0px;
    color: white;
    font-weight: 500;
  }

  label {
    background-color: var(--okButton);
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    width: 20px !important;
    height: 20px !important;
  }
`;
