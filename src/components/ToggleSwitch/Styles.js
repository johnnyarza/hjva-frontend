import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 0px 10px 0px 10px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-radius: 10px;
  height: 52px;
  border: 1px solid white;
  font-weight: 500;
  &:hover {
    border-color: ${darken(0.2, '#EBEBEB')} !important;
  }

  z-index: 3;
`;
