import { darken } from 'polished';
import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  overflow: hidden;
`;

export const Forbidden = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${darken(0.5, '#ebebeb')};
  svg {
    height: 60px;
    width: 60px;
  }
  > span {
    font-weight: 500;
    font-size: 24px;
  }
`;

export const Content = styled.div`
  margin-top: ${(props) => (props.isMobile ? '70px' : '125px')};
  margin-right: ${(props) => (props.isMobile ? '32px' : '64px')};
  margin-left: ${(props) => (props.isMobile ? '32px' : '64px')};
`;
export const InputContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 35px;
  background-color: white;
  border-radius: 5px;
  padding: 5px 8px 5px 8px;
  border: 1px solid transparent;
  transition: border-color 0.2s;
  svg {
    ${(props) => {
      return props.isFocused
        ? css`
            color: black;
          `
        : css`
            color: ${darken(0.2, '#EBEBEB')};
          `;
    }}
  }
  ${(props) => {
    return props.isFocused
      ? css`
          border-color: #3498db !important;
        `
      : '';
  }}

  &:hover {
    border-color: ${darken(0.2, '#EBEBEB')};
  }
`;

export const InputContainer = styled.div`
  z-index: 2;
  position: fixed;
  width: 45%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  top: ${(props) => (props.isMobile ? '8px' : '15px')};
  input {
    width: 100%;
    height: 100%;
    border: none;
  }
`;
