import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${darken(0.5, '#ebebeb')};
  > span {
    font-weight: 500;
    font-size: 24px;
  }

  svg {
    height: 60px;
    width: 60px;
  }
`;
