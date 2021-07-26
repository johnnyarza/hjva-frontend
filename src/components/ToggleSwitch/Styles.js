import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: white;
  border-radius: 10px;
  height: 52px;
  border: 1px solid white;
  &:hover {
    border-color: ${darken(0.2, '#EBEBEB')} !important;
  }

  z-index: 3;
`;
