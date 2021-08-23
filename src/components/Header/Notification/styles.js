import { lighten } from 'polished';
import styled, { css } from 'styled-components';

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

export const NotificationContent = styled.div`
  position: absolute;
  background-color: white;
  width: 200px;
  left: calc(50% - 100px);
  top: calc(100% + 15px);
  border-radius: 15px;
  padding: 10px;

  border: 1px solid #b8b8b8;

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

export const Notification = styled.div`
  div {
    display: flex;
    flex-direction: column;
    &:hover {
      color: #3498db;
    }
  }
  & + div {
    margin-top: 10px;
    border-top: 1px solid rgb(0, 0, 0, 0.1);
  }
`;
