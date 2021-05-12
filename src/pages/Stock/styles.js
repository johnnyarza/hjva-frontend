import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding-left: 130px;
  min-height: 400px;
`;

export const DeleteConfirmationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .cancel-btn {
    background-color: #e74c3c;
  }

  .ok-btn {
    background-color: #2ecc71;
  }
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
