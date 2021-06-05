import styled from 'styled-components';

export const Content = styled.div`
  .add-material-button {
    background-color: #2ecc71;
    min-width: 140px;
  }
  .materials-label {
    position: absolute;
    z-index: 1;
    background-color: #ebebeb;
    color: #95a5a6;
    font-weight: 600;
    border-radius: 5px;
    padding: 0 5px 0 5px;
    top: -8px;
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
