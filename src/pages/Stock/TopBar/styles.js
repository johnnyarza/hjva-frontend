import styled from 'styled-components';

export const Container = styled.div`
  min-height: 40px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 15px;

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

    font-weight: 500;

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.8) 0 0 5px;
      background-color: #2ecc71;
    }

    &:active {
      box-shadow: rgba(0, 0, 0, 0.8) 0 0 15px;
    }
  }
`;
