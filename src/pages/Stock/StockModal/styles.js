import styled from 'styled-components';

export const Container = styled.div``;
export const Content = styled.div`
  --emerald: #2ecc71;
  --alizarin: #c0392b;
  display: grid;
  grid-template-columns: auto;

  .btn-container {
    display: grid;
    grid-template-columns: auto auto;
    margin-top: 10px;
    padding: 0 8px 0 8px;
  }

  .btn-cancel {
    background-color: var(--alizarin);
  }
  .btn-ok {
    background-color: var(--emerald);
  }
`;
