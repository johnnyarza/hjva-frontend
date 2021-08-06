import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 16px;
  a + a {
    margin-top: 8px;
  }
`;
