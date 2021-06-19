import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;

  svg {
    width: 18px;
    height: auto;
  }

  button {
    background: none;
    border: none;
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
`;
