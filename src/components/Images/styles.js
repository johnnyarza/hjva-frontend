import styled from 'styled-components';
import { darken } from 'polished';
import { FaImage } from 'react-icons/fa';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  grid-template-rows: 100%;
  min-height: 360px;

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
  .teste {
    img {
      max-height: 100%;
    }
  }
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
  border-color: ${darken(0.1, '#ebebeb')}!important;

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
