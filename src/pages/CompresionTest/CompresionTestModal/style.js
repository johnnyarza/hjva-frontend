import styled, { css } from 'styled-components';

export const Content = styled.div`
  min-width: 200px;
  .btn-container {
    display: grid;
    place-items: center center;
    grid-template-columns: auto auto;
    margin-top: 10px;
    padding: 0 8px 0 8px;
    button {
      margin: 0;
    }
  }

  .btn-cancel {
    background-color: var(--cancelButton);
  }
  .btn-ok {
    background-color: var(--okButton);
  }
`;
