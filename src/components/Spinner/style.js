import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export const Content = styled.div`
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #fff159; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
`;
