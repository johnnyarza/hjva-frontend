import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;
export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 10px;

  form {
    display: flex;
    flex-direction: column;
    margin: 20px 30px 20px 30px;
    span {
      color: #e74c3c;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }
    h1 {
      margin-bottom: 20px;
    }

    input {
      background: #fff;
      border: 0;
      height: 44px;
      padding: 0 15px;
      color: #000;
      margin: 0 0 10px;
      border-bottom: 1px solid #000;
      &::placeholder {
        color: #000;
      }
    }
    button {
      margin: 5px 0;
      height: 44px;
      background: #3b9eff;
      border: 0;
      color: #fff;
      font-size: 16px;
      border-radius: 4px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#3b9eff')};
      }
    }

    a {
      color: ${darken(0.2, '#ebebeb')};
      font-family: 'Roboto';
      font-weight: bold;
      margin-top: 10px;
      transition: color 0.2s;

      &:hover {
        color: ${darken(0.8, '#ebebeb')};
      }
    }
  }
`;
