import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
`;

export const Button = styled.button`
  cursor: pointer;

  right: 1%;
  opacity: ${(props) => (props.disabled ? 0 : 1)};
  user-select: none;
  border: none;
  background: transparent;

  svg {
    height: 40px;
    width: auto;
  }
  &:hover {
    div {
      background-color: #2ecc71;
      box-shadow: rgba(0, 0, 0, 0.8) 0 0 5px;
    }
  }

  &:active {
    div {
      box-shadow: rgba(0, 0, 0, 0.8) 0 0 10px;
    }
  }
`;

export const Content = styled.div`
  background-color: white;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  transition: all 0.2s;
`;
