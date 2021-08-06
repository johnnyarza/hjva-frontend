import styled, { css } from 'styled-components';
import { FaImage } from 'react-icons/fa';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 15% 70% 15%;
  label,
  button {
    transition: box-shadow 0.2s;
    box-shadow: none !important;
    border: 1px solid rgba(0, 0, 0, 0.8);

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
