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
  .text-container {
    padding: 5px 5px 5px 5px;
    height: 100%;
    width: 100%;
    textarea {
      height: 100%;
      width: 100%;
    }
  }
  .form-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .product-inputs-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: none;
    margin: 4px 0 5px 4px;
  }

  .inputs-container {
    display: flex;
    flex-direction: column;
    justify-content: center;

    margin: 0 10px 0 5px;

    div {
      margin: 4px 0 4px 0;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
      background-color: green;
    }
  }
`;
