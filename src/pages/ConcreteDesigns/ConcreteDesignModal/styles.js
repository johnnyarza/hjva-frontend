import styled from 'styled-components';

export const Content = styled.div`
  .add-material-button {
    background-color: #2ecc71;
    min-width: 140px;
  }
  .edit-buttons-container {
    display: flex;
    justify-content: center;

    button {
      background: none;
      border: none;
      width: 20px;
      &:hover {
        box-shadow: none;
      }
      &:focus {
        box-shadow: none;
      }

      svg {
        width: 18px;
        height: auto;
        color: black;
      }
    }

    .delete-button {
      svg:hover {
        color: #e74c3c;
      }
    }

    .edit-button {
      svg:hover {
        color: #3498db;
      }
    }
  }
`;
