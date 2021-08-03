import { darken } from 'polished';
import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  overflow: hidden;
`;

export const Content = styled.div`
  margin-top: 125px;
  margin-right: 64px;
  margin-left: 64px;
`;
export const InputContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45%;
  height: 35px;
  background-color: white;
  border-radius: 5px;
  padding: 5px 8px 5px 8px;
  border: 1px solid transparent;
  transition: border-color 0.2s;
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
  width: 100%;
  display: flex;
  justify-content: center;
  top: 15px;
  input {
    width: 100%;
    height: 100%;
    border: none;
  }
`;
