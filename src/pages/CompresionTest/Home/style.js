import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding-left: 130px;
  min-height: 400px;
`;

export const Content = styled.div`
  .edit-buttons-container {
    display: flex;
    justify-content: center;

    button {
      background: none;
      border: none;
      svg {
        width: 18px;
        height: auto;
      }
    }
    .delete-button {
      :hover {
        color: #e74c3c;
      }
    }

    .edit-button {
      :hover {
        color: #3498db;
      }
    }
  }
`;

export const MenuContainer = styled.div`
  margin-bottom: 15px;
  min-height: 40px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;

  button {
    min-height: 25px;
    font: 16px 'Roboto';
    min-width: 80px;
    border: none;
    border-radius: 5px;
    transition: all 0.2s;
    padding-left: 5px;
    padding-right: 5px;

    margin-left: 10px;

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.8) 0 0 5px;
      background-color: #2ecc71;
    }

    &:active {
      box-shadow: rgba(0, 0, 0, 0.8) 0 0 15px;
    }
  }
`;
