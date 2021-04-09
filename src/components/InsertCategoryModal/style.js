import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 500px;

  img {
    width: auto;
    height: 142px;
  }

  div {
    display: flex;
    flex-direction: row;
  }

  h1 {
    margin-bottom: 10px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
      margin-top: 10px;
    }
    .ok-button {
      background-color: #27ae60;
    }

    .cancel-button {
      background-color: #c0392b;
    }
  }
`;
