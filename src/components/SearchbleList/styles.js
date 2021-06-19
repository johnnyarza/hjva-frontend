import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const Tooltip = styled.div`
  background-color: #e74c3c;
  color: white;

  display: flex;

  border-radius: 15px;

  position: absolute;
  top: calc(100% - 40px);
  ${(props) =>
    props.position === 'left'
      ? css`
          right: 103%;
        `
      : css`
          left: 103%;
        `}

  padding: 5px;
  min-height: 25px;
  width: 30px;

  z-index: 2;

  transition: all 0.2s;

  .icon-error {
    display: block;

    height: 20px;
    align-self: center;
    width: auto;
  }

  .error-message {
    color: white;
    display: none;
    font-size: 12px;
    white-space: nowrap;
    margin: 0 0 0 5px;
    align-self: center;
    font-weight: 400;
  }

  &:hover {
    width: auto;
    .error-message {
      display: block;
    }
  }
`;
