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

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        border: none;
        margin: 4px 0 5px 4px;
      }
    }

    button {
      background-color: green;
    }
  }
`;
