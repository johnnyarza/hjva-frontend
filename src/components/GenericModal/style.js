import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 250, 250, 0.7);
  top: 0;
  left: 0;
  z-index: 4;
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  padding: 15px;
  background-color: #ebebeb;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    display: block;
    margin-bottom: 15px;
    font-size: 16px;
  }

  .form-ok-button {
    background-color: var(--okButton);
  }
  .form-cancel-button {
    background-color: var(--cancelButton);
  }

  button {
    width: 80px;
    height: 30px;
    border: none;
    border-radius: 15px;
    color: white;
    font-weight: 500;
    font-size: 16px;
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.8) 0 0 5px;
    }
    &:focus {
      box-shadow: rgba(0, 0, 0, 0.8) 0 0 8px;
    }
    & + button {
      margin-left: 8px;
    }
  }
`;
