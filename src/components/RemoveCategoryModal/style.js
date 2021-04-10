import styled from 'styled-components';

export const Content = styled.div`
  min-width: 200px;
  min-height: 150px;
  display: flex;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    .ok-button {
      background-color: #27ae60;
    }

    .cancel-button {
      background-color: #c0392b;
    }

    .button-container {
      margin-top: 15px;
      display: flex;
      justify-content: center;
    }
    div {
      width: 100%;
    }
  }
`;
