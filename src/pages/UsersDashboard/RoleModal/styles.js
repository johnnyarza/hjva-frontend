import styled from 'styled-components';

export const Container = styled.div`
  width: 200px;
`;
export const Content = styled.div`
  width: 100%;
`;

export const FormButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  button {
    margin: 0 !important;
    justify-self: center;
  }
  .ok-btn {
    background-color: var(--okButton);
  }
  .cancel-btn {
    background-color: var(--cancelButton);
  }
`;
