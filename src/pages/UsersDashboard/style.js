import styled from 'styled-components';

export const Container = styled.div`
  padding-left: 10%;
  width: 100%;
  height: 100%;
  .form-ok-button {
    background-color: #2ecc71;
    min-height: 32px;
  }
  .form-cancel-button {
    background-color: var(--cancelButton);
    min-height: 32px;
  }
`;
export const Content = styled.div`
  max-height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-left: auto;
  margin-right: auto;
  .key-btn {
    background: none;
    border: none;
    margin-right: 2px;
    svg {
      height: 18px;
    }
    :hover {
      color: #3498db;
    }
  }
`;

export const GridContainer = styled.div`
  align-self: center;
  display: grid;
  padding: 10px;
  grid-row-gap: 10px;
  grid-column-gap: 5px;
`;
export const NameContainer = styled.div`
  height: 100%;
  background-color: white;
  align-self: center;
  border-radius: 5px;
  padding: 5px;
`;

export const SelectContainer = styled.div`
  min-height: 32px;
  padding: 5px;
  background-color: white;
  border-radius: 5px;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.8) 0 0 5px;
  }

  select {
    width: 100%;
    height: 100%;
    border: none;
    font: 'Roboto';
    background-color: white;
  }
`;
