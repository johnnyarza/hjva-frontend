import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  background-color: #fff159;
  padding: ${(props) => (props.isMobile ? '0 8px' : '0 16px')};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
  svg {
    color: #000;
    margin-right: 5px;
    height: 20px;
    width: 20px;

    &:hover {
      color: ${lighten(0.5, '#000')};
    }
  }
`;
