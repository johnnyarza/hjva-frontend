import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 500px;

  .img-buttons-container {
    position: absolute;
    bottom: -10px;
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: 2;
    button {
      width: 20px;
      height: 20px;
      border-radius: 20px;
    }
  }

  .prev-img {
    background-color: white !important;
    width: 40px;
    height: 40px;
    border-radius: 40px;
    color: black;
    align-self: center;
    position: absolute;
    z-index: 3;
    margin-top: auto;
    margin-bottom: auto;
    top: 0;
    bottom: 0;
  }

  .next-img {
    background-color: white !important;
    width: 40px;
    height: 40px;
    border-radius: 40px;
    color: black;
    align-self: center;
    position: absolute;
    z-index: 3;
    margin-top: auto;
    margin-bottom: auto;
    top: 0;
    bottom: 0;
    right: 0;
  }

  .img-div {
    align-self: center;
    margin-top: 15px;
    position: relative;
    min-width: 400px;
    label {
      cursor: pointer;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 3;
      background-color: #008000;
      width: 20px;
      height: 20px;
      border-radius: 20px;

      &:hover {
        box-shadow: rgba(0, 0, 0, 0.8) 0 0 5px;
      }

      &:active {
        box-shadow: rgba(0, 0, 0, 0.8) 0 0 15px;
      }

      img {
        min-width: 240px;
        min-height: 160px;
        border: none;
        background-image: #eee;
        border-radius: 5px;
      }

      input {
        display: none;
      }
    }
  }

  img {
    max-height: 240px;
    width: auto;
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
    margin: 4px 0 15px 4px;
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

      &:active {
        box-shadow: rgba(0, 0, 0, 0.8) 0 0 15px;
      }
    }
  }
`;
