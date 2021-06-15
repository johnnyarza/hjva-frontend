import styled, { css } from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  background-color: #fff159;
  padding: 0 64px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
`;

export const NotificationContent = styled.div`
  position: absolute;
  background-color: white;
  width: 200px;
  left: calc(50% - 100px);
  top: calc(100% + 15px);
  border-radius: 15px;
  padding: 10px;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 10px);
    top: -10px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid rgba(0, 0, 0, 0.6);
  }
`;

export const NotificationContainer = styled.div`
  position: relative;
  display: flex;

  svg {
    transition: color 0.2s;

    ${(props) =>
      props.hasNotification
        ? css`
            animation: blink 2s ease-in infinite;
          `
        : ''}
    &:hover {
      color: ${lighten(0.5, '#000')};
      animation: none;
    }
  }

  @keyframes blink {
    from,
    to {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;
export const Notification = styled.div`
  max-height: 50px;
  & + div {
    margin-top: 10px;
    border-top: 1px solid rgb(0, 0, 0, 0.1);
  }
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
      background-color: transparent;
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
