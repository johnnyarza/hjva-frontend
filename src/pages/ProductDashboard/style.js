import styled from 'styled-components';

export const Container = styled.div`
  padding-left: 10%;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;

  table {
    min-width: 900px;
    display: none;

  }

  th, td {
    text-align: left;
    border-bottom: solid 1px #EBEBEB;
  }
  .row-data {
    height: 30px;
    &:hover {
      background-color: #3498db;
    }
  }
`;

export const TableContainer = styled.div`
  padding: 15px;
  background-color: white;
  margin-bottom: 15px;
  border-radius: 15px;
  min-width: 900px;
  transition: box-shadow 0.2s;

  &:hover {
      box-shadow: rgba(0, 0, 0, 0.8) 0 0 5px;
    }

  h1 {
    margin-bottom: 10px;
    border-bottom: solid 1px #EBEBEB;
    font-size: 20px;
  }
  `;
