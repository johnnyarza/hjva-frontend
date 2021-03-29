import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  background-color: #fff159;
  padding: 0 64px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;
export const Content = styled.div`
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  nav {
    display: flex;

    a {
      display: flex;
      flex-direction: column;
      cursor: pointer;

      span {
        color: #000;
        font-size: 15px;
        font-family: 'Roboto';
        font-weight: bold;
        white-space: nowrap;
      }
      img {
        height: 45px;
        margin-right: 20px;
        padding-right: 20px;
      }
    }
  }
  aside {
    display: flex;
    align-items: center;
    height: 100%;
    button {
      display: flex;
      align-items: center;
      background-color: #fff159;
      border: none;
      color: #000;
    }
    nav {
      a {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    }
    svg {
      color: #000;
      margin-right: 5px;
      height: 25px;
      width: 25px;
      transition: color 0.2s;

      &:hover {
        color: ${lighten(0.5, '#000')};
      }
    }
  }
`;

export const MiddleContent = styled.div`
  margin-left: 32px;
  padding: 5px 0px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;

  div {
    display: flex;
    justify-content: space-between;

    svg {
      color: #000;
      margin-right: 5px;
      height: 20px;
      width: 20px;
      transition: color 0.2s;

      &:hover {
        color: ${lighten(0.5, '#000')};
      }
    }
  }
`;

export const HeaderInput = styled.input`
  height: 100%;
  width: 100%;
  max-width: 500px;
  max-height: 25px;
  border-radius: 3px;
  border: none;
  padding: 0 5px;
  font-size: 15px;
`;
