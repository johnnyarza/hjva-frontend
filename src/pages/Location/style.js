import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 90px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: ${(props) => (props.isMobile ? '16px' : '18px')};
    font-weight: 500;
  }
`;
